import { Interface } from '@ethersproject/abi'
import { ChainId } from '../common'
import { AddressSelector, precondition, validateAddress } from '../utils'
import { Calldata, FilterTopics } from './types'
import abi from './abi/pool.json'

/**
 * Describes options to stake in a pool.
 */
export type PoolContractStakeOptions = {
  /**
   * Optional address which receives tokens.
   */
  recipient?: string
  /**
   * Optional address which gets its contributed amount increased.
   */
  partner?: string
}

/**
 * Describes options to activate pending validators in a pool.
 */
export type PoolContractActivateOptions = {
  /**
   * Account address to activate tokens for.
   */
  account: string
  /**
   * Index or a list of indexes of activated validators.
   */
  validatorIndexes: number | number[]
}

/**
 * Describes options to track activated deposits in a pool.
 */
export type PoolContractActivatedOptions = {
  /**
   * Optional account address the deposit was activated for.
   */
  account?: string
  /**
   * Optional address which made the deposit.
   */
  sender?: string
}

/**
 * Staking pool enables ETH deposits and mints of sETH2 tokens.
 * For larger deposits, a validator can be placed into the activation
 * queue and the user has to claim the sETH2 tokens after the activation period is finished.
 */
export abstract class PoolContract {
  private static readonly INTERFACE = new Interface(abi)

  private static readonly ADDRESS: AddressSelector = {
    [ChainId.Mainnet]: '0xC874b064f465bdD6411D45734b56fac750Cda29A',
    [ChainId.Goerli]: '0x8c1EfEcFb5c4F1099AB0460b5659342943764Df7',
  }

  private constructor() {
    throw new Error('No instances')
  }

  /**
   * Retrieves a pool contract address for specific chain id.
   * @param chainId A valid chain id
   * @returns A pool contract address
   */
  public static getAddress(chainId: ChainId): string {
    const address = this.ADDRESS[chainId]
    precondition(address, `${chainId} is invalid chain id`)
    return address
  }

  /**
   * Stakes Eth into a pool.
   * @param options Staking options
   * @returns Encoded hex calldata
   */
  public static getStakeCalldata(options: PoolContractStakeOptions = {}): Calldata {
    const recipient = options.recipient ? validateAddress(options.recipient) : null
    const partner = options.partner ? validateAddress(options.partner) : null
    if (recipient && partner) {
      return this.INTERFACE.encodeFunctionData('stakeWithPartnerOnBehalf(address,address)', [partner, recipient])
    } else if (recipient) {
      return this.INTERFACE.encodeFunctionData('stakeOnBehalf(address)', [recipient])
    } else if (partner) {
      return this.INTERFACE.encodeFunctionData('stakeWithPartner(address)', [partner])
    } else {
      return this.INTERFACE.encodeFunctionData('stake()')
    }
  }

  /**
   * Mints account's tokens for specific validator indexes.
   * @param options Validators activation options
   * @returns Encoded hex calldata
   */
  public static getActivateCalldata(options: PoolContractActivateOptions): Calldata {
    const account = validateAddress(options.account)
    if (Array.isArray(options.validatorIndexes)) {
      return this.INTERFACE.encodeFunctionData('activateMultiple(address,uint256[])', [
        account,
        validateValidatorIndex(options.validatorIndexes),
      ])
    } else {
      return this.INTERFACE.encodeFunctionData('activate(address,uint256)', [
        account,
        validateValidatorIndex(options.validatorIndexes),
      ])
    }
  }

  /**
   * Checks if a validator can be activated.
   * @param validatorIndex Validator index integer
   * @returns Encoded hex calldata
   */
  public static getCanActivateCalldata(validatorIndex: number): Calldata {
    return this.INTERFACE.encodeFunctionData('canActivate(uint256)', [validateValidatorIndex(validatorIndex)])
  }

  /**
   * Event for tracking scheduled deposit activation.
   * @param sender Optional address of the depositor
   * @returns Encoded filter topics
   */
  public static getActivationScheduledFilterTopics(sender?: string): FilterTopics {
    const event = this.INTERFACE.getEvent('ActivationScheduled(address,uint256,uint256)')
    return this.INTERFACE.encodeFilterTopics(event, [sender ? validateAddress(sender) : null])
  }

  /**
   * Event for tracking activated deposits.
   * @param options Optional options of activated deposits
   * @returns Encoded filter toptics
   */
  public static getActivatedFilterTopics(options: PoolContractActivatedOptions = {}): FilterTopics {
    const event = this.INTERFACE.getEvent('Activated(address,uint256,uint256,address)')
    return this.INTERFACE.encodeFilterTopics(event, [
      options.account ? validateAddress(options.account) : null,
      null,
      null,
      options.sender ? validateAddress(options.sender) : null,
    ])
  }
}

function validateValidatorIndex(indexes: number | number[]): number | number[] {
  const items = Array.isArray(indexes) ? indexes : [indexes]
  precondition(items.every(Number.isInteger), `${indexes} is not a valid validator index or set of indexes`)
  return indexes
}
