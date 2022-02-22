import faker from '@faker-js/faker'
import crypto from 'crypto'
import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { provider } from '@openzeppelin/test-environment'

import config from './config'
import {
  validateString,
  validateObject,
  validateAddress,
  validateNetwork,
  validateProvider,
  validateBigNumber,
} from './validations'


const string = faker.random.word()
const bigNumber = BigNumber.from(faker.datatype.number())
const addressWithoutPrefix = crypto.randomBytes(32).toString('hex').slice(0, 40)
const address = `0x${addressWithoutPrefix}`

describe('util/validations.ts', () => {

  describe('validateString', () => {

    it('validates string', async () => {
      const isValid = validateString(string, 'string')

      expect(isValid).toEqual(true)
    })

    it('throws an error if property is not type of string', () => {
      expect(
        () => validateString(null, 'string')
      )
        .toThrowError(/"string" is not type of string/)
    })
  })

  describe('validateBigNumber', () => {

    it('validates BigNumber', async () => {
      const isValid = validateBigNumber(bigNumber, 'bigNumber')

      expect(isValid).toEqual(true)
    })

    it('throws an error if property is not type of BigNumber', () => {
      expect(
        () => validateBigNumber(null, 'bigNumber')
      )
        .toThrowError(/"bigNumber" is not type of BigNumber/)
    })

    it('throws an error if property is not greater than zero', () => {
      const zeroOrLess = faker.datatype.number({ min: -1, max: 0 })

      expect(
        () => validateBigNumber(BigNumber.from(zeroOrLess), 'bigNumber')
      )
        .toThrowError(/"bigNumber" must be greater than zero/)
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
      const isValid = validateAddress(address, string)

      expect(isValid).toEqual(true)
    })

    it('validates address without prefix', async () => {
      const isValid = validateAddress(addressWithoutPrefix, string)

      expect(isValid).toEqual(true)
    })

    it('throws an error if address is not valid', async () => {
      expect(
        () => validateAddress(string, string)
      )
        .toThrowError(new RegExp(`"${string}" is not a valid ${string}`))
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

    it('validates provider', async () => {
      // @ts-ignore
      const web3Provider = new Web3Provider(provider)

      const isValid = validateProvider(web3Provider)

      expect(isValid).toEqual(true)
    })

    it('throws an error if provider is not valid', async () => {
      expect(
        () => validateProvider({})
      )
        .toThrowError(/Provider is not valid/)
    })
  })
})
