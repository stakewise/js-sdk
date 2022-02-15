import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import createContracts from './createContracts'


jest.mock('@ethersproject/contracts', () => ({
  Contract: jest.fn(),
}))

describe('util/createContracts.ts', () => {

  it('creates contracts', () => {
    const contracts = createContracts({} as Web3Provider)

    expect(typeof contracts).toEqual('object')
    expect(contracts).not.toBeNull()
    expect(Contract).toHaveBeenCalledTimes(Object.keys(contracts).length)
  })
})
