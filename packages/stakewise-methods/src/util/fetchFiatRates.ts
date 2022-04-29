import { BigNumber, FixedNumber } from '@ethersproject/bignumber'

import type { Contracts } from './createContracts'


export type Rate = 'ethUsd' | 'eurUsd' | 'gbpUsd'

export type FiatRates = Record<Rate, number>

type ModifyFiatRatesProps = {
  ethUsd: BigNumber
  eurUsd: BigNumber
  gbpUsd: BigNumber
}

export const modifyFiatRates = ({ ethUsd, eurUsd, gbpUsd }: ModifyFiatRatesProps) => {
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

const fetchFiatRates = async (fiatRateContracts: Contracts['fiatRateContracts']): Promise<FiatRates> => {
  const [ ethUsd, eurUsd, gbpUsd ] = await Promise.all<BigNumber>([
    fiatRateContracts.ethUsd.latestAnswer(),
    fiatRateContracts.eurUsd.latestAnswer(),
    fiatRateContracts.gbpUsd.latestAnswer(),
  ])

  return modifyFiatRates({ ethUsd, eurUsd, gbpUsd })
}


export default fetchFiatRates
