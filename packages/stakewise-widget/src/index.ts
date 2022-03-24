import WidgetType, { Options, OpenProps } from 'stakewise-widget'
import Methods, { GetBalancesResult } from 'stakewise-methods'
import { formatEther } from '@ethersproject/units'

import { validateBrowser, validateOptions, formatBalance, styles } from './util'


class Widget implements WidgetType {

  methods: Methods

  private rootContainer: HTMLElement
  private shadowRoot: DocumentFragment

  private content: HTMLElement | null = null
  private overlay: HTMLElement

  private status: 'loading' | 'error' | 'initial' = 'loading'

  private callbacks: {
    onSuccess?: Options['onSuccess']
    onError?: Options['onError']
    onClose?: Options['onClose']
  } = {}

  constructor(options: Options) {
    validateBrowser()
    validateOptions(options)

    const { provider, address, referral, onSuccess, onError, onClose } = options

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
    overlay.classList.add('overlay')

    return {
      rootContainer,
      shadowRoot,
      overlay,
    }
  }

  private renderModal() {
    this.overlay.innerHTML = `
      <div id="modal" class="modal">
        <div id="content" class="content">
          <div class="loader"></div>
        </div>
        <button id="close"></button>
      </div>
    `

    this.content = this.shadowRoot.getElementById('content')
    const modal = this.shadowRoot.getElementById('modal') as HTMLElement
    const closeButton = this.shadowRoot.getElementById('close') as HTMLElement
    closeButton.classList.add('closeButton')

    this.overlay.onclick = () => this.handleClose()
    closeButton.onclick = () => this.handleClose()
    modal.onclick = (event) => event.stopPropagation()
  }

  private renderError() {
    if (this.content && this.status !== 'error') {
      this.status = 'error'
      this.content.innerHTML = '<div>Error</div>'
    }
  }

  private setLoading(isEnabled: boolean) {
    if (this.content && this.status === 'initial') {
      if (isEnabled) {
        // set loading button
      }
      else {
        // remove loading button
      }
    }
  }

  private async renderInitial({ balances, stakingApr }: { balances: GetBalancesResult, stakingApr: number }) {
    if (this.content && this.status !== 'initial') {
      this.status = 'initial'

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

      // TODO update fiat$ign

      this.content.innerHTML = `
        <div class="top color-white">
          <div class="logo">
            <img src="" />
            <div class="ml-8 text-20">STAKEWISE</div>
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
          <form novalidate>
            <div class="mt-16">
              <input
                id="input"
                class="input"
                placeholder="Enter ETH amount"
                autofocus
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

      const input = this.shadowRoot.getElementById('input')

      if (input) {
        input.focus()
      }
      // onButtonClick
      // callMethod(this.methods.deposit)
    }
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
      .catch(() => this.renderError())
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
