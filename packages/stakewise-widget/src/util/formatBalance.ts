type Input = {
  value: string
  min?: number
  max?: number
  withSeparator?: boolean
}

const setSeparator = (value: string) => {
  const reverseArray = value.split('').reverse()

  const changedArray = reverseArray.reduce((acc, number, index) => {
    if (index && index % 3 === 0) {
      return [ ...acc, ',', number ]
    }

    return [ ...acc, number ]
  }, [] as string[])

  return changedArray.reverse().join('')
}

const formatBalance = (values: Input): string => {
  const { value, min = 2, max = 4, withSeparator = true } = values

  let [ integer, remainder ] = value.split('.')
  const zeros = [ ...Array(min) ].reduce((acc) => `${acc}0`, '')
  const rest = zeros ? `.${zeros}` : ''

  if (!integer) {
    return `0${rest}`
  }

  // 0001 => 1
  integer = Number(integer).toString()

  integer = (withSeparator && integer.length > 3)
    ? setSeparator(integer)
    : integer

  if (!remainder) {
    return `${integer}${rest}`
  }

  remainder = remainder.substring(0, max)

  if (remainder.length < min) {
    for (let i = 0; i < min; i++) {
      const value = remainder[i]

      if (!value) {
        remainder = `${remainder}0`
      }
    }
  }

  if (Number(remainder)) {
    return `${integer}.${remainder}`
  }

  return `${integer}${rest}`
}


export default formatBalance
