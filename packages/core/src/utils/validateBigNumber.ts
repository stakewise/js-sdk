import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export function validateBigNumber(number: BigNumberish): BigNumber {
  try {
    return BigNumber.from(number)
  } catch (ignore) {
    throw new Error(`${number} is invalid big number`)
  }
}
