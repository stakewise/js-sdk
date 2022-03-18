import { BigNumber } from '@ethersproject/bignumber'

import type { Currency, FiatRates } from './fetchFiatRates'


export type FiatValues = Record<Currency, number>

export type GetFiatValuesProps = {
  value: BigNumber
  fiatRates: FiatRates
}

const getFiatValues = ({ value, fiatRates }: GetFiatValuesProps): FiatValues => {
  const result = {} as FiatValues
  const currencies = Object.keys(fiatRates) as Currency[]
  const formattedValue = value.toNumber()

  currencies.forEach((currency) => {
    const fiatRate = fiatRates[currency]

    result[currency] = Number((formattedValue * fiatRate).toFixed(2))
  })

  return result
}


export default getFiatValues
