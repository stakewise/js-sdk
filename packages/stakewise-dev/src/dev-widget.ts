import WidgetType, { Options } from '@stakewise/widget'
import Widget from '@stakewise/widget'
import Methods from './dev-methods'


class DevWidget extends Widget implements WidgetType {

  constructor(options: Options) {
    super(options)

    const { provider, sender, referrer } = options

    this.methods = new Methods({
      provider,
      sender,
      referrer,
    })
  }
}


export default DevWidget
