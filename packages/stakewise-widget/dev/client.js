import { providers } from 'ethers'
import Widget from '../dist'


const button = document.createElement('button')

button.innerHTML = 'Open modal'
button.onclick = () => {
  const widget = new Widget({
    address: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
    referral: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
    provider: new providers.Web3Provider(window.web3?.currentProvider),
    onError: (data) => {
      console.log('error', data)
    }
  })

  widget.open()
}

document.body.appendChild(button)

// widget.open()
