import { BigNumber, FixedNumber } from '@ethersproject/bignumber'

import type { Contracts } from './createContracts'


export type Rate = 'ethUsd' | 'eurUsd' | 'gbpUsd'

export type FiatRates = Record<Rate, number>

const fetchFiatRates = async (fiatRateContracts: Contracts['fiatRateContracts']): Promise<FiatRates> => {
  const [ ethUsd, eurUsd, gbpUsd ] = await Promise.all<BigNumber>([
    fiatRateContracts.ethUsd.latestAnswer(),
    fiatRateContracts.eurUsd.latestAnswer(),
    fiatRateContracts.gbpUsd.latestAnswer(),
  ])

  const rates: Record<Rate, BigNumber> = { ethUsd, eurUsd, gbpUsd }
  const result = {} as FiatRates
  const rateKeys = Object.keys(rates) as Rate[]
  const ethUsdRate = FixedNumber.from(ethUsd)

  rateKeys.forEach((rateKey) => {
    const rate = rates[rateKey]
    const rateDivider = rateKey === 'ethUsd'
      ? FixedNumber.from(100_000_000)
      : FixedNumber.from(rate)

    result[rateKey] = ethUsdRate.divUnsafe(rateDivider).toUnsafeFloat()
  })

  return result
}


export default fetchFiatRates
