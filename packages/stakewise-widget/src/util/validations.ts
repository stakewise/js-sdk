import type { Options } from 'stakewise-widget'


export const validateBrowser = () => {
  const isValid = typeof document?.body?.attachShadow === 'function'

  if (!isValid) {
    throw new Error('Current browser is not supported')
  }

  return isValid
}

export const validateObject = (object: unknown, propertyName: string): object is Record<string, unknown> => {
  if (!object) {
    throw new Error(`"${propertyName}" is an empty object`)
  }

  const isValid = typeof object === 'object'

  if (!isValid) {
    throw new Error(`"${propertyName}" is not type of object`)
  }

  return isValid
}

const validFuncTypes = ['undefined', 'function']

export const validateFunction = (func: unknown, propertyName: string): func is Function | undefined => {
  const isValid = validFuncTypes.includes(typeof func)

  if (!isValid) {
    throw new Error(`"${propertyName}" is not type of function`)
  }

  return isValid
}

export const validateTheme = (theme: unknown): theme is 'dark' | 'light' | undefined => {
  const isValid = typeof theme === 'undefined' || [ 'dark', 'light' ].includes(theme as string)

  if (!isValid) {
    throw new Error(`"theme" is not "dark" or "light"`)
  }

  return isValid
}

export const validateOptions = (options: unknown): options is Options => {
  validateObject(options, 'options')

  const { theme, onSuccess, onError, onClose } = options as Options

  validateTheme(theme)
  validateFunction(onSuccess, 'onSuccess')
  validateFunction(onError, 'onError')
  validateFunction(onClose, 'onClose')

  return true
}
