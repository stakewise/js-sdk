import MethodsType, {
  Options,
  GetBalancesResult,
} from 'stakewise-methods'
import { validateString } from './util'


class Methods implements MethodsType {

  provider: Options['provider']
  address: Options['address']
  referral: Options['referral']

  constructor(options: Options) {
    const { provider, address, referral } = options

    validateString(address, 'address')
    validateString(referral, 'referral')

    this.provider = provider
    this.address = address
    this.referral = referral
  }

  getBalances(): Promise<GetBalancesResult> {
  }
}


export default Methods
