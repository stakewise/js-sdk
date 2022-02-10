import WidgetType from 'stakewise-widget'
import Methods, { Options } from 'stakewise-methods'


class Widget implements WidgetType {

  methods: Methods

  constructor(options: Options) {
    const { provider, address, referral } = options

    this.methods = new Methods({ provider, address, referral })
  }
}


export default Widget
