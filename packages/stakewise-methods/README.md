# StakeWise Methods

The package contains a JavaScript class that provides
methods to deposit ETH in staking and get deposit data.

### Create an instance of a class
```js
import Methods from 'stakewise-methods'

const methods = new Methods({
  provider, // ethers.js provider
  address, // wallet address
  referral, // referral address
  network, // optional, by default 'mainnet'
})
```

### Fetching token balances
```js
try {
  const balances = await methods.getBalances()
  
  const {
    swiseTokenBalance, // BigNumber with amount of SWISE 
    stakedTokenBalance, // BigNumber with amount of staked tokens (e.g. sETH2)
    rewardTokenBalance, // BigNumber with amount of reward tokens (e.g. rETH2)
    nativeTokenBalance, // BigNumber with amount of native tokens (e.g. ETH)
  } = balances
} catch (error) {
  console.error(error)
}
```

### Fetching staking APR
```js
try {
  const stakingApr = await methods.getStakingApr()
  // stakingApr is a number of annual yield percent
} catch (error) {
  console.error(error)
}
```
