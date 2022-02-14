import {
  validateString,
  validateObject,
  validateAddress,
  validateNetwork,
  validateProvider,
  validateOptions,
} from './validations'


describe('util/validations.ts', () => {

  describe('validateString', () => {
    it('validates string', () => {
      expect(
        () => validateString('string', 'string')
      ).toBeTruthy()
    })

    it('throws error if property is not type of string', () => {
      expect(
        () => validateString(null, 'string')
      ).toThrowError(/"string" is not type of string/)
    })
  })

  describe('validateObject', () => {

  })

  describe('validateAddress', () => {

  })

  describe('validateNetwork', () => {

  })

  describe('validateProvider', () => {

  })

  describe('validateOptions', () => {

  })
})
