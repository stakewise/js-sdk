import WidgetType, { Options, OpenProps } from 'stakewise-widget'
import Methods, { GetBalancesResult } from 'stakewise-methods'
import { parseEther } from '@ethersproject/units'

import { validateBrowser, validateOptions } from './util'

// import './styles.css'


class Widget implements WidgetType {

  private methods: Methods

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

    const fontLink = document.createElement('link')
    fontLink.rel = 'stylesheet'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap'

    const stylesLink = document.createElement('link')
    stylesLink.rel = 'stylesheet'
    stylesLink.href = './styles.css'
    stylesLink.onload = () => {
      rootContainer.style.display = 'block'
    }

    shadowRoot.appendChild(fontLink)
    shadowRoot.appendChild(stylesLink)
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
      <div id="modal">
        <div id="content">
          <div class="loader"></div>
        </div>
        <button id="close"></button>
      </div>
    `

    this.content = this.shadowRoot.getElementById('content')
    const modal = this.shadowRoot.getElementById('modal') as HTMLElement
    const closeButton = this.shadowRoot.getElementById('close') as HTMLElement

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
          title: 'sETH2',
          icon: 'seth2',
          value: parseEther(balances.stakedTokenBalance.toString()),
        },
        {
          title: 'rETH2',
          icon: 'reth2',
          value: parseEther(balances.rewardTokenBalance.toString()),
        },
        {
          title: 'SWISE',
          icon: 'swise',
          value: parseEther(balances.swiseTokenBalance.toString()),
        },
        {
          title: 'ETH',
          icon: 'eth',
          value: parseEther(balances.nativeTokenBalance.toString()),
        },
      ]

      this.content.innerHTML = `
        <div class="flex justify-center">
          <div class="logo swise"></div>
          <div class="ml-8 text-20">STAKEWISE</div>
        </div>
        <div class="mt-24">
          ${
            balanceItems.map(({ title, value, icon }, index) => `
              <div class="flex ${index ? 'mt-12' : ''}">
                <div class="flex flex-1">
                  <div class="icon ${icon} mr-8"></div>${title}:
                </div>
                <div class="flex-1">${value}</div>
              </div>
            `).join('')
          }
        </div>
        <div class="mt-24">
          STAKE
        </div>
      `

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
