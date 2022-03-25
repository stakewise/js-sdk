import WidgetType, { Options, OpenProps } from 'stakewise-widget'
import Methods, { GetBalancesResult } from 'stakewise-methods'
import { formatEther, parseEther } from '@ethersproject/units'

import { validateBrowser, validateOptions, formatBalance, styles, images } from './util'
import type { ContractTransaction } from 'ethers'


const texts = {
  error: 'Something went wrong<br />Please try again',
  sending: 'Sending transaction',
  submitted: 'Transaction has been<br />submitted',
  confirmed: 'Transaction has been<br />confirmed',
  waitingConfirmation: 'Waiting for transaction<br />confirmation',
}

class Widget implements WidgetType {

  methods: Methods
  private theme: Options['theme']

  private rootContainer: HTMLElement
  private shadowRoot: DocumentFragment

  private content: HTMLElement | null = null
  private overlay: HTMLElement
  private closeButton?: HTMLElement

  private callbacks: {
    onSuccess?: Options['onSuccess']
    onError?: Options['onError']
    onClose?: Options['onClose']
  } = {}

  constructor(options: Options) {
    validateBrowser()
    validateOptions(options)

    const { provider, address, referral, ...widgetOptions } = options
    const { theme, onSuccess, onError, onClose } = widgetOptions

    this.theme = theme || 'light'

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
    const rootContainer = document.createElement('div')
    rootContainer.style.display = 'none'

    const shadowRoot = rootContainer.attachShadow({ mode: 'closed' })

    const style = document.createElement('style')
    style.innerHTML = styles
    // style.innerHTML = styles[this.theme]

    const fontLink = document.createElement('link')
    fontLink.rel = 'stylesheet'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap'

    fontLink.onload = () => {
      rootContainer.style.display = 'block'
    }

    shadowRoot.appendChild(style)
    shadowRoot.appendChild(fontLink)
    document.body.appendChild(rootContainer)

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
    this.overlay.innerHTML = `
      <div id="modal" class="modal">
        <div id="content" class="content">
          <div class="info">
            ${images.loading}
            <div class="infoTitle color-rocky">Loading</div>
            <div class="infoText">Load balances</div>
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

  private renderInfo({ type, text }: { type: 'loading' | 'success' | 'error', text?: string }) {
    const color = {
      error: 'color-fargo',
      loading: 'color-rocky',
      success: 'color-matrix',
    }[type]

    if (this.content && color) {
      this.setCloseButtonColor('color-titanic')
      this.content.innerHTML = `
        <div class="info">
          ${images[type]}
          <div class="infoTitle capitalize ${color}">${type}</div>
          <div class="infoText">${text}</div>
        </div>
      `
    }
  }

  private async renderInitial({ balances, stakingApr }: { balances: GetBalancesResult, stakingApr: number }) {
    if (this.content) {
      const balanceItems = [
        {
          title: 'STAKED',
          value: formatBalance({ value: formatEther(balances.stakedTokenBalance.value.toString()) }),
          fiatValue: formatBalance({ value: balances.stakedTokenBalance.fiatValues.usd.toString() }),
        },
        {
          title: 'REWARDS',
          value: formatBalance({ value: formatEther(balances.rewardTokenBalance.value) }),
          fiatValue: formatBalance({ value: balances.rewardTokenBalance.fiatValues.usd.toString() }),
        },
        // {
        //   title: 'SWISE',
        //   icon: 'swise',
        //   value: formatBalance({ value: formatEther(balances.swiseTokenBalance.value) }),
        //   fiatValue: formatBalance({ value: balances.swiseTokenBalance.fiatValues.usd.toString() }),
        // },
        {
          title: 'ETH',
          value: formatBalance({ value: formatEther(balances.nativeTokenBalance.value) }),
          fiatValue: formatBalance({ value: balances.nativeTokenBalance.fiatValues.usd.toString() }),
        },
      ]

      this.setCloseButtonColor('color-white')
      // TODO update fiat$ign
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
                  <div class="text-10 opacity-48">$${fiatValue}</div>
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
              <input
                id="input"
                class="input"
                placeholder="Enter ETH amount"
              />
            </div>
            <div class="mt-16">
              <button
                class="button"
                type="submit"
              >
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

  open(props: OpenProps) {
    this.shadowRoot.appendChild(this.overlay)

    this.renderModal()
    this.fetchInitial()
      .then(({ balances, stakingApr }) => this.renderInitial({ balances, stakingApr }))
      .catch(() => this.renderInfo({ type: 'error', text: texts.error }))
  }

  private handleClose() {
    document.body.removeChild(this.rootContainer)
  }

  close() {
    if (this.rootContainer) {
      this.handleClose()

      if (this.callbacks.onClose) {
        this.callbacks.onClose()
      }
    }
  }
}


export default Widget
