import { isAddress as checkIsAddress } from '@ethersproject/address'


const required = (value) => {
  if (!value) {
    return 'Required'
  }
}

const isAddress = (value) => {
  if (!checkIsAddress(value)) {
    return 'Enter correct address'
  }
}


export {
  required,
  isAddress,
}
