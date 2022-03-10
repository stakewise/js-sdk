import { providers } from 'ethers'
import Widget from '../dist'


const widget = new Widget({
  address: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
  referral: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
  provider: new providers.Web3Provider(web3.currentProvider),
})


export default widget
