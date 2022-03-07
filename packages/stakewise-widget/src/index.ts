import WidgetType from 'stakewise-widget'
import Methods, { Options } from 'stakewise-methods'


class Widget implements WidgetType {

  private id = `stakewise-widget-${Date.now()}`
  private methods: Methods

  constructor(options: Options) {
    const { provider, address, referral } = options

    this.methods = new Methods({ provider, address, referral })
  }

  render(status: 'initial' | 'loading' | 'error') {

  }

  open() {
    const root = document.createElement('div')
    root.id = this.id

    root.attachShadow({ mode: 'closed' })
    // render in div?
  }

  close() {
    // remove div
  }
}


export default Widget
