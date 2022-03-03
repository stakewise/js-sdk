import { Contract } from '@ethersproject/contracts'

import config from '../../src/util/config'
import createContracts from '../../src/util/createContracts'

const { ethers } = require('hardhat')


jest.mock('@ethersproject/contracts')

describe('util/createContracts.ts', () => {

  it('creates contracts for default network', () => {
    const contracts = createContracts(ethers.provider, config.defaultNetwork)

    expect(typeof contracts).toEqual('object')
    expect(contracts).not.toBeNull()
    expect(Contract).toHaveBeenCalledTimes(Object.keys(contracts).length)
  })
})
