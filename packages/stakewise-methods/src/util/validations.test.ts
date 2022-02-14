import faker from '@faker-js/faker'
import crypto from 'crypto'
import config from './config'
import {
  validateString,
  validateObject,
  validateAddress,
  validateNetwork,
  validateProvider,
} from './validations'


const string = faker.random.word()
const address = `0x${crypto.randomBytes(32).toString('hex').slice(0, 40)}`

describe('util/validations.ts', () => {

  describe('validateString', () => {

    it('validates string', async () => {
      const isValid = validateString(null, 'string')

      expect(isValid).toEqual(true)
    })

    it('throws an error if property is not type of string', () => {
      expect(
        () => validateString(null, 'string')
      )
        .toThrowError(/"string" is not type of string/)
    })
  })

  describe('validateObject', () => {

    it('validates object', async () => {
      const isValid = validateObject({}, 'object')

      expect(isValid).toEqual(true)
    })

    it('throws an error if property is null', () => {
      expect(
        () => validateObject(null, 'object')
      )
        .toThrowError(/"object" is an empty object/)
    })

    it('throws an error if property is not type of object', () => {
      expect(
        () => validateObject(string, 'object')
      )
        .toThrowError(/"object" is not type of object/)
    })
  })

  describe('validateAddress', () => {

    it('validates address', async () => {
      const isValid = validateAddress(address)

      expect(isValid).toEqual(true)
    })

    it('throws an error if address is not valid', async () => {
      expect(
        () => validateAddress(string)
      )
        .toThrowError(new RegExp(`"${string}" is not a valid address`))
    })
  })

  describe('validateNetwork', () => {

    it('validates network', async () => {
      const isValid = validateNetwork(config.defaultNetwork)

      expect(isValid).toEqual(true)
    })

    it('validates empty network', async () => {
      const isValid = validateNetwork(null)

      expect(isValid).toEqual(true)
    })

    it('throws an error if network is not valid', async () => {
      expect(
        () => validateNetwork(string)
      )
        .toThrowError(new RegExp(`"${string}" is not allowed network`))
    })
  })

  describe('validateProvider', () => {

  })
})
