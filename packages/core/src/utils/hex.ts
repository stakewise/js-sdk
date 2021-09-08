import { BigNumberish } from '@ethersproject/bignumber'
import { validateBigNumber } from './validateBigNumber'

export const toHex = (value: BigNumberish): string => validateBigNumber(value).toHexString()
