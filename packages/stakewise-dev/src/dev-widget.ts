import WidgetType, { Options } from 'stakewise-widget'
import Methods from 'stakewise-methods/dist/dev'

import Widget from 'stakewise-widget'


class DevWidget extends Widget implements WidgetType {

  constructor(options: Options) {
    super(options)

    const { provider, address, referral } = options

    this.methods = new Methods({
      provider,
      address,
      referral,
    })
  }
}


export default DevWidget