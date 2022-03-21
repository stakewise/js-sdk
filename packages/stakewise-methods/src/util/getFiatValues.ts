import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

import type { FiatRates, Rate } from './fetchFiatRates'


export type Currency = 'usd' | 'eur' | 'gbp'

export type FiatValues = Record<Currency, number>

export type GetFiatValuesProps = {
  value: BigNumber
  fiatRates: FiatRates
}

const getFiatValues = ({ value, fiatRates }: GetFiatValuesProps): FiatValues => {
  const result = {} as FiatValues
  const rates = Object.keys(fiatRates) as Rate[]
  const formattedValue = Number(formatEther(value))
  const currencyOfRates: Record<Rate, Currency> = {
    ethUsd: 'usd',
    eurUsd: 'eur',
    gbpUsd: 'gbp',
  }

  rates.forEach((rate) => {
    const fiatRate = fiatRates[rate]
    const currency = currencyOfRates[rate]

    result[currency] = Number((formattedValue * fiatRate).toFixed(2))
  })

  return result
}


export default getFiatValues
