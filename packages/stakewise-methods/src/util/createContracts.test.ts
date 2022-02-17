import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import config from './config'
import createContracts from './createContracts'


jest.mock('@ethersproject/contracts')

describe('util/createContracts.ts', () => {

  it('creates contracts for default network', () => {
    const contracts = createContracts({} as Web3Provider, config.defaultNetwork)

    expect(typeof contracts).toEqual('object')
    expect(contracts).not.toBeNull()
    expect(Contract).toHaveBeenCalledTimes(Object.keys(contracts).length)
  })
})
