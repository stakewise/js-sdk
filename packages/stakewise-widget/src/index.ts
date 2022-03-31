import WidgetType, { Options, OpenProps } from 'stakewise-widget'
import Methods, { GetBalancesResult } from 'stakewise-methods'
import { formatEther, parseEther } from '@ethersproject/units'

import { validateBrowser, validateOptions, formatBalance, styles, images } from './util'
import type { ContractTransaction } from 'ethers'


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
  private currency: keyof typeof currencySigns

  private rootContainer: Element
  private shadowRoot: ShadowRoot
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

    const { provider, address, referral, ...widgetOptions } = options
    const { currency, theme, overlay: overlayType, onSuccess, onError, onClose } = widgetOptions

    this.theme = theme || 'light'
    this.overlayType = overlayType || 'dark'
    this.currency = currency?.toLowerCase() as keyof typeof currencySigns || 'usd'

    this.methods = new Methods({ provider, address, referral })
    this.callbacks = {
      onSuccess,
      onError,
      onClose,
    }

    const { rootContainer, shadowRoot, overlay } = this.initShadowRoot()

    this.rootContainer = rootContainer
    this.shadowRoot = shadowRoot
    this.overlay = overlay
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
      document.body.appendChild(rootContainer)

      currentShadowRoot = shadowRoot
    }

    const overlay = document.createElement('div')
    overlay.classList.add('overlay', this.theme as string)

    return {
      rootContainer,
      shadowRoot,
      overlay,
    }
  }

  private setCloseButtonColor(color: string) {
    if (this.theme === 'light') {
      this.closeButton?.classList.add(color)
      this.closeButton?.classList.remove(color === 'color-titanic' ? 'color-white' : 'color-titanic')
    }
  }

  private renderModal() {
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

    this.overlay.innerHTML = `
      <div id="modal" class="modal">
        <div id="content" class="h-full">
          <div class="info">
            ${images.loading}
            <div class="infoTitle color-rocky">Loading</div>
            <div class="infoText">${texts.loading}</div>
          </div>
        </div>
        <button id="close" class="closeButton ${this.theme === 'light' ? 'color-titanic' : 'color-white'}">${images.close}</button>
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

    const color = {
      error: 'color-fargo',
      loading: 'color-rocky',
      success: 'color-matrix',
    }[type]

    if (this.content && color) {
      const backButtonHtml = type !== 'loading' ? `
        <div class="backButtonContainer">
          <button id="backButton" class="button ${type}Button">Go back</button>
        </div>
      ` : ''

      this.setCloseButtonColor('color-titanic')
      this.content.innerHTML = `
        <div class="info">
          ${images[type]}
          <div class="infoTitle capitalize ${color}">${type}</div>
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

      this.setCloseButtonColor('color-white')

      this.content.innerHTML = `
        <div class="top color-white">
          <div class="logo">
            ${images.logo}
            <div class="ml-6 text-14">STAKEWISE</div>
          </div>
          <div class="apr">${stakingApr}%</div>
          <div class="aprText">Staking APR</div>
        </div>
        <div class="balances">
          ${
            balanceItems.map(({ title, value, fiatValue }, index) => `
              <div class="balance ${index ? 'mt-12' : ''}">
                ${title}
                <div class="text-right">
                  <div class="text-14">${value}</div>
                  <div class="text-10 opacity-48">${currencySigns[this.currency]}${fiatValue}</div>
                </div>
              </div>
            `).join('')
          }
          <div class="start">
            <span class="startText">START STAKE</span>
            <div class="startLine"></div>
          </div>
          <form id="depositForm" novalidate>
            <div class="mt-16">
              <input id="input" class="input" placeholder="Enter ETH amount" />
            </div>
            <div class="mt-16">
              <button class="button stakeButton" type="submit">
                Stake now
              </button>
            </div>
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
    this.shadowRoot.removeChild(this.overlay)

    if (this.rootContainer && this.overlayStyle) {
      this.rootContainer.removeChild(this.overlayStyle)
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
