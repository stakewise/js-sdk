import MethodsType, { Options } from 'stakewise-methods'


class Methods implements MethodsType {

  provider: Options['provider']
  address: Options['address']
  referral: Options['referral']

  constructor(options: Options) {
    const { provider, address, referral } = options

    this.provider = provider
    this.address = address
    this.referral = referral
  }
}


export default Methods
