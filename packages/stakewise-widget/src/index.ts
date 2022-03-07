import WidgetType, { OpenProps } from 'stakewise-widget'
import Methods, { Options } from 'stakewise-methods'


class Widget implements WidgetType {

  private methods: Methods
  private container: HTMLElement | null = null
  private state: null = null

  constructor(options: Options) {
    const { provider, address, referral } = options

    this.methods = new Methods({ provider, address, referral })

    const isValidBrowser = Boolean(document?.body?.attachShadow)

    if (!isValidBrowser) {
      throw new Error('Current browser is not supported')
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
    }
  }
}


export default Widget
