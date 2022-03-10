import WidgetType, { Options, OpenProps } from 'stakewise-widget'
import Methods from 'stakewise-methods'

import { validateBrowser, validateOptions } from './util'


class Widget implements WidgetType {

  private methods: Methods
  private container: HTMLElement | null = null
  private status: 'loading' | 'error' | 'initial' = 'loading'
  private initialView: {
    status: 'loading' | 'success' | 'default'
  } = {
    status: 'default'
  }

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
  }

  private renderError() {
    if (this.container && this.status !== 'error') {
      this.status = 'error'
    }
  }

  private async renderLoading() {
    if (this.container && this.status !== 'loading') {
      this.status = 'loading'
    }
  }

  private setLoading(isEnabled: boolean) {
    if (this.container && this.status === 'initial') {
      if (isEnabled) {
        // set loading button
      }
      else {
        // remove loading button
      }
    }
  }

  private async renderInitial() {
    if (this.container && this.status !== 'initial') {
      this.status = 'initial'

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

        this.renderError()

        return Promise.reject(error)
      })
  }

  private fetchInitial() {
    return Promise.all([
      this.callMethod(this.methods.getBalances, 'getBalances'),
      this.callMethod(this.methods.getStakingApr, 'getStakingApr'),
    ])
      .then(([ balances, stakingApr ]) => {
        // set
      })
  }

  open(props: OpenProps) {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.attachShadow({ mode: 'closed' })
      document.body.appendChild(this.container)

      this.renderLoading()
      this.fetchInitial()
        .then(() => this.renderInitial())
    }
  }

  close() {
    if (this.container) {
      document.body.removeChild(this.container)
      this.container = null

      if (this.callbacks.onClose) {
        this.callbacks.onClose()
      }
    }
  }
}


export default Widget
