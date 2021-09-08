import { BigNumberish } from '@ethersproject/bignumber'
import { validateBigNumber } from '.'

export function toHex(value: BigNumberish): string {
  return validateBigNumber(value).toHexString()
}
