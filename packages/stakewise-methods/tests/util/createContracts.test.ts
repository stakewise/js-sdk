import { Contract } from '@ethersproject/contracts'

import config from '../../src/util/config'
import { createContracts } from '../../src/util'

const { ethers } = require('hardhat')


jest.mock('@ethersproject/contracts')

describe('util/createContracts.ts', () => {

  it('creates contracts for default network', () => {
    const contracts = createContracts(ethers.provider, config.defaultNetwork)

    expect(typeof contracts).toEqual('object')
    expect(contracts).not.toBeNull()

    const { fiatRateContracts, ...rest } = contracts

    const contractsCount = Object.keys({  ...rest, ...fiatRateContracts }).length

    expect(Contract).toHaveBeenCalledTimes(contractsCount)
  })
})
