export const validateString = (string: unknown, propertyName: string): string is string => {
  const isValid = typeof string === 'string'

  if (!isValid) {
    throw new Error(`${propertyName} is not type of string`)
  }

  return isValid
}
