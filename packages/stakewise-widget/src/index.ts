import WidgetType, { Options, OpenProps } from 'stakewise-widget'
import Methods from 'stakewise-methods'

import { validateBrowser, validateOptions } from './util'


class Widget implements WidgetType {

  private methods: Methods
  private container: HTMLElement | null = null
  private state: null = null
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

  private render(status: 'loading' | 'ui' | 'error') {

  }

  open(props: OpenProps) {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.attachShadow({ mode: 'closed' })

      this.render('loading')

      document.body.appendChild(this.container)
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
