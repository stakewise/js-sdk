import { BigNumber } from '@ethersproject/bignumber'

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(10000).add(1000).div(10000)
}
