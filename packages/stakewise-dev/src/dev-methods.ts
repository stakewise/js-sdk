import Methods, { FetchBalancesResult, Options } from 'stakewise-methods'
import { BigNumber } from '@ethersproject/bignumber'
import { fetchFiatRates, FiatRates, NetworkConfig } from 'stakewise-methods/dist/util'
import { createContractsWithConfig } from 'stakewise-methods/dist/util/createContracts'


const goerliConfig = {
  api: {
    rest: 'https://stage-api.stakewise.io',
  },
  addresses: {
    pool: '0x8c1EfEcFb5c4F1099AB0460b5659342943764Df7',
    swiseToken: '0x0e2497aACec2755d831E4AFDEA25B4ef1B823855',
    stakedToken: '0x221D9812823DBAb0F1fB40b0D294D9875980Ac19',
    rewardToken: '0x826f88d423440c305D9096cC1581Ae751eFCAfB0',
    // mainnet
    ethUsdRate: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    eurUsdRate: '0xb49f677943BC038e9857d61E7d053CaA2C1734C1',
    gbpUsdRate: '0x5c0Ab2d9b5a7ed9f470386e82BB36A3613cDd4b5',
  }
}

type DevMethodsOptions = Options & {
  isTestnet: boolean
}

class DevMethods extends Methods implements Methods {

  isTestnet: boolean

  constructor(options: DevMethodsOptions) {
    super(options)

    const { provider } = options

    provider.getNetwork()
      .then(({ chainId }) => {
        this.isTestnet = chainId === 5

        if (this.isTestnet) {
          this.contracts = createContractsWithConfig(provider, goerliConfig as NetworkConfig)
        }
      })
  }

  async fetchBalances(): Promise<FetchBalancesResult> {
    try {
      const [
        nativeTokenBalance,
        stakedTokenBalance,
        rewardTokenBalance,
        swiseTokenBalance,
        fiatRates,
      ]: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        FiatRates,
      ] = await Promise.all([
        this.provider.getBalance(this.address),
        this.contracts.stakedTokenContract.balanceOf(this.address),
        this.contracts.rewardTokenContract.balanceOf(this.address),
        this.contracts.swiseTokenContract.balanceOf(this.address),
        this.isTestnet ? Promise.resolve({
          ethUsd: 3017.58079368,
          eurUsd: 2741.4185165757126,
          gbpUsd: 2290.4273657412855,
        }) : fetchFiatRates(this.contracts.fiatRateContracts)
      ])

      const result = {
        fiatRates,
        balances: {
          nativeTokenBalance,
          stakedTokenBalance,
          rewardTokenBalance,
          swiseTokenBalance,
        },
      }

      return result
    }
    catch (error) {
      console.error(error)
      throw new Error('Fetch balances failed')
    }
  }
}


export default DevMethods
