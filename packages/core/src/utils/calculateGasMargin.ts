import { BigNumber } from '@ethersproject/bignumber'

export const calculateGasMargin = (value: BigNumber): BigNumber => value.mul(10000).add(1000).div(10000)
