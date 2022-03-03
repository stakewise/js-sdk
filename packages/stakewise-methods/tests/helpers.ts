import { BigNumber } from '@ethersproject/bignumber'
import { Account } from 'web3-core'
import { web3 } from '@openzeppelin/test-environment'

const { ethers } = require('hardhat')


export const createAccount = async (ethValue?: BigNumber): Promise<Account> => {
  const newAccount = await web3.eth.accounts.create()

  if (ethValue) {
    const [ signer ] = await ethers.getSigners()

    await signer.sendTransaction({
      to: newAccount.address,
      value: ethValue,
    })
  }

  return newAccount
}
