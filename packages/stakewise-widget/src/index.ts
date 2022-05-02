import WidgetType, { Options, OpenProps } from '@stakewise/widget'
import Methods, { GetBalancesResult } from '@stakewise/methods'
import { formatEther, parseEther } from '@ethersproject/units'
import type { ContractTransaction } from 'ethers'

import { validateBrowser, validateOptions, formatBalance, styles, images } from './util'


const texts = {
  error: 'Something went wrong<br />Please try again',
  loading: 'Load balances',
  sending: 'Sending transaction',
  submitted: 'Transaction has been<br />submitted',
  confirmed: 'Transaction has been<br />confirmed',
  waitingConfirmation: 'Waiting for transaction<br />confirmation',
}

const currencySigns = {
  usd: '$',
  eur: '€',
  gbp: '£',
}

let currentShadowRoot: ShadowRoot

class Widget implements WidgetType {

  methods: Methods
  private theme: Options['theme']
  private overlayType: Options['overlay']
  private customStyles: Options['customStyles']
  private currency: keyof typeof currencySigns

  private rootContainer: Element
  private shadowRoot: ShadowRoot | Pick<ShadowRoot, 'appendChild' | 'removeChild' | 'getElementById'>
  private overlayStyle?: HTMLStyleElement

  private content: HTMLElement | null = null
  private overlay: HTMLElement
  private closeButton?: HTMLElement
  private input?: HTMLInputElement

  private loadFont?: Promise<void>

  private callbacks: {
    onSuccess?: Options['onSuccess']
    onError?: Options['onError']
    onClose?: Options['onClose']
  } = {}

  private listeners: {
    keypress?: (event: KeyboardEvent) => void
    paste?: (event: ClipboardEvent) => void
  } = {}

  constructor(options: Options) {
    validateBrowser()
    validateOptions(options)

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    const { provider, sender, referrer, ...widgetOptions } = options
    const { currency, theme, overlay: overlayType, customStyles, onSuccess, onError, onClose } = widgetOptions

    this.currency = currency?.toLowerCase() as keyof typeof currencySigns || 'usd'
    this.customStyles = customStyles

    this.methods = new Methods({ provider, sender, referrer })
    this.callbacks = {
      onSuccess,
      onError,
      onClose,
    }

    if (customStyles) {
      this.rootContainer = document.body

      this.shadowRoot = {
        appendChild: (node) => document.body.appendChild(node),
        removeChild: (node) => document.body.removeChild(node),
        getElementById: (id) => document.getElementById(id),
      }

      const overlay = document.createElement('div')
      overlay.classList.add('overlay')

      this.overlay = overlay
    }
    else {
      this.theme = theme || 'light'
      this.overlayType = overlayType || 'dark'

      const { rootContainer, shadowRoot, overlay } = this.initShadowRoot()

      this.rootContainer = rootContainer
      this.shadowRoot = shadowRoot
      this.overlay = overlay
    }
  }

  private initShadowRoot() {
    let rootContainer
    let shadowRoot

    if (currentShadowRoot) {
      rootContainer = currentShadowRoot?.host
      shadowRoot = currentShadowRoot
    }
    else {
      rootContainer = document.createElement('div')
      rootContainer.classList.add('stakewiseWidgetRootContainer')
      rootContainer.style.zIndex = '999999'
      rootContainer.style.position = 'relative'

      shadowRoot = rootContainer.attachShadow({ mode: 'closed' })

      const style = document.createElement('style')
      style.innerHTML = styles

      const fontLink = document.createElement('link')
      fontLink.rel = 'stylesheet'
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap'

      this.loadFont = new Promise((resolve) => {
        fontLink.onload = () => resolve()
        setTimeout(resolve, 3000)
      })

      shadowRoot.appendChild(style)
      shadowRoot.appendChild(fontLink)

      currentShadowRoot = shadowRoot
    }

    const overlay = document.createElement('div')
    overlay.classList.add('overlay')

    if (!this.customStyles) {
      overlay.classList.add(this.theme as string)
    }

    return {
      rootContainer,
      shadowRoot,
      overlay,
    }
  }

  private setCloseButtonView(view: string) {
    this.closeButton?.classList.add(view)
    this.closeButton?.classList.remove(view === 'infoView' ? 'dataView' : 'infoView')
  }

  private renderModal() {
    if (!this.customStyles) {
      if (this.overlayType === 'blur') {
        const overlayStyle = document.createElement('style')
        overlayStyle.innerHTML = `
          body > * {transition: filter ease 0.6s}
          body > *:not(.stakewiseWidgetRootContainer) {filter: blur(8px);}
        `

        this.overlayStyle = overlayStyle
        this.rootContainer.appendChild(overlayStyle)
      }
      else {
        this.overlay.classList.add('darkOverlay')
      }
    }

    this.overlay.innerHTML = `
      <div id="modal" class="modal">
        <div id="content">
          <div class="info loading">
            ${images.loading}
            <div class="infoTitle">Loading</div>
            <div class="infoText">${texts.loading}</div>
          </div>
        </div>
        <button id="close" class="closeButton infoView">${images.close}</button>
      </div>
    `

    this.content = this.shadowRoot.getElementById('content')
    const modal = this.shadowRoot.getElementById('modal') as HTMLElement
    const closeButton = this.shadowRoot.getElementById('close') as HTMLElement

    this.closeButton = closeButton
    this.overlay.onclick = () => this.handleClose()
    closeButton.onclick = () => this.handleClose()
    modal.onclick = (event) => event.stopPropagation()
  }

  private renderInfo({ type, text }: { type: 'loading' | 'success' | 'error', text: string }) {
    this.removeEventListeners()

    if (this.content) {
      const backButtonHtml = type !== 'loading' ? `
        <div class="backButtonContainer">
          <button id="backButton" class="button ${type}Button">Go back</button>
        </div>
      ` : ''

      this.setCloseButtonView('dataView')
      this.content.innerHTML = `
        <div class="info ${type}">
          ${images[type]}
          <div class="infoTitle">${type}</div>
          <div class="infoText">${text}</div>
        </div>
        ${backButtonHtml}
      `

      if (backButtonHtml) {
        const backButton = this.shadowRoot.getElementById('backButton') as HTMLButtonElement
        backButton.onclick = () => {
          this.renderInfo({ type: 'loading', text: texts.loading })
          this.handleRenderInitial()
        }
      }
    }
  }

  private async renderInitial({ balances, stakingApr }: { balances: GetBalancesResult, stakingApr: number }) {
    if (this.content) {
      const balanceItems = [
        {
          title: 'STAKED',
          value: formatBalance({ value: formatEther(balances.stakedTokenBalance.value.toString()) }),
          fiatValue: formatBalance({ value: balances.stakedTokenBalance.fiatValues[this.currency].toString() }),
        },
        {
          title: 'REWARDS',
          value: formatBalance({ value: formatEther(balances.rewardTokenBalance.value) }),
          fiatValue: formatBalance({ value: balances.rewardTokenBalance.fiatValues[this.currency].toString() }),
        },
        {
          title: 'ETH',
          value: formatBalance({ value: formatEther(balances.nativeTokenBalance.value) }),
          fiatValue: formatBalance({ value: balances.nativeTokenBalance.fiatValues[this.currency].toString() }),
        },
      ]

      this.setCloseButtonView('infoView')

      const formattedApr = formatBalance({
        value: String(stakingApr),
        max: 2,
      })

      this.content.innerHTML = `
        <div class="top">
          <div class="logo">
            ${images.logo}
            <div class="logoText">STAKEWISE</div>
          </div>
          <div class="apr">${formattedApr}%</div>
          <div class="aprText">Staking APR</div>
        </div>
        <div class="balances">
          ${
            balanceItems.map(({ title, value, fiatValue }, index) => `
              <div class="balance">
                ${title}
                <div class="balanceValue">
                  <div class="balanceTokenValue">${value}</div>
                  <div class="balanceFiatValue">${currencySigns[this.currency]}${fiatValue}</div>
                </div>
              </div>
            `).join('')
          }
          <div class="start">
            <span class="startText">START STAKE</span>
            <div class="startLine"></div>
          </div>
          <form id="depositForm" novalidate>
            <input id="input" class="input" placeholder="Enter ETH amount" />
              <button class="button stakeButton" type="submit">
                Stake now
              </button>
          </form>
        </div>
      `

      const input = this.shadowRoot.getElementById('input') as HTMLInputElement
      const form = this.shadowRoot.getElementById('depositForm')

      if (input) {
        input.focus()

        const keypress = (event: KeyboardEvent) => {
          const target = event.target as HTMLInputElement
          const value = target.value
          const char = event.key
          const isDot = /\./.test(char) && value && !/\./.test(value)
          const isNumber = /\d/.test(char)

          if(!isNumber && !isDot){
            event.preventDefault()
          }
        }

        const paste = (event: ClipboardEvent) => {
          const target = event.target as HTMLInputElement
          const value = target.value
          const text = event.clipboardData?.getData('Text')

          if (text) {
            const result = `${value}${text}`

            if (!/^\d+((\.)?\d+)?$/.test(result)) {
              event.preventDefault()
            }
          }
        }

        input.addEventListener('keypress', keypress)
        input.addEventListener('paste', paste)

        this.input = input
        this.listeners = { keypress, paste }

        if (form) {
          form.onsubmit = async (event) => {
            event.preventDefault()
            this.handleDeposit(input.value)
          }
        }
      }
    }
  }

  private handleDeposit(value: string) {
    this.renderInfo({ type: 'loading', text: texts.sending })

    const amount = parseEther(value)
    this.callMethod(() => this.methods.deposit({ amount }), 'deposit')
      .then((transaction: ContractTransaction) => {
        if (transaction?.hash) {
          this.renderInfo({ type: 'loading', text: texts.waitingConfirmation })
          return this.methods.provider.waitForTransaction(transaction.hash)
            .then(() => this.renderInfo({ type: 'success', text: texts.confirmed }))
        }
        else {
          this.renderInfo({ type: 'success', text: texts.submitted })
        }
      })
      .catch(() => this.renderInfo({ type: 'error', text: texts.error }))
  }

  private callMethod(fn: Function, methodName: string) {
    return fn()
      .catch((error: Error) => {
        this.callbacks.onError?.({
          method: methodName,
          error,
        })

        return Promise.reject(error)
      })
  }

  private fetchInitial() {
    return Promise.all([
      this.callMethod(() => this.methods.getBalances(), 'getBalances'),
      this.callMethod(() => this.methods.getStakingApr(), 'getStakingApr'),
    ])
      .then(([ balances, stakingApr ]) => ({ balances, stakingApr }))
  }

  private handleRenderInitial() {
    this.fetchInitial()
      .then(({ balances, stakingApr }) => this.renderInitial({ balances, stakingApr }))
      .catch(() => this.renderInfo({ type: 'error', text: texts.error }))
  }

  open(props: OpenProps) {
    if (!this.customStyles) {
      document.body.appendChild(this.rootContainer)
    }

    const promise = this.loadFont || Promise.resolve()

    promise.then(() => {
      this.shadowRoot.appendChild(this.overlay)

      this.renderModal()
      this.handleRenderInitial()
    })
  }

  private removeEventListeners() {
    if (this.input) {
      if (this.listeners.keypress) {
        this.input.removeEventListener('keypress', this.listeners.keypress)
      }
      if (this.listeners.paste) {
        this.input.removeEventListener('paste', this.listeners.paste)
      }
    }
  }

  private clearHtml() {
    this.removeEventListeners()
    this.shadowRoot.removeChild(this.overlay)

    if (this.rootContainer) {
      if (this.overlayStyle) {
        this.rootContainer.removeChild(this.overlayStyle)
      }

      if (!this.customStyles) {
        document.body.removeChild(this.rootContainer)
      }
    }
  }

  private handleClose() {
    this.clearHtml()

    if (this.callbacks.onClose) {
      this.callbacks.onClose()
    }
  }

  close() {
    this.clearHtml()
  }
}


export default Widget
