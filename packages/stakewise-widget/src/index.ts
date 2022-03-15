import WidgetType, { Options, OpenProps } from 'stakewise-widget'
import Methods, { GetBalancesResult } from 'stakewise-methods'

import { validateBrowser, validateOptions } from './util'

// import './styles.css'


class Widget implements WidgetType {

  private methods: Methods

  private rootContainer: HTMLElement
  private shadowRoot: DocumentFragment

  private content: HTMLElement | null = null
  private overlay: HTMLElement

  private status: 'loading' | 'error' | 'initial' = 'loading'
  // private initialView: {
  //   status: 'loading' | 'success' | 'default'
  // } = {
  //   status: 'default'
  // }

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

    this.rootContainer = document.createElement('div')
    this.shadowRoot = this.rootContainer.attachShadow({ mode: 'closed' })

    const stylesLink = document.createElement('link')
    stylesLink.rel = 'stylesheet'
    stylesLink.href = './styles.css'

    this.shadowRoot.appendChild(stylesLink)
    document.body.appendChild(this.rootContainer)

    this.overlay = document.createElement('div')
    this.overlay.classList.add('overlay')
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

      this.content.innerHTML = '<div>Initial</div>'

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
    this.shadowRoot.removeChild(this.overlay)
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
