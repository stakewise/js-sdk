# StakeWise Methods

The package contains a JavaScript class that provides
methods to deposit ETH in staking and get deposit data.

### Create an instance of a class
```js
import Methods from 'stakewise-methods'

const methods = new Methods({
  provider, // ethers.js provider
  address, // wallet address
  referral, // 
  network, // optional, by default 'mainnet'
})
```

### getBalances
```js
try {
  const balances = await methods.getBalances()
  
  const {
    swiseTokenBalance, // amount of SWISE BigNumber
    rewardTokenBalance, // amount of rETH2 BigNumber
    stakedTokenBalance, // amount of sETH2 BigNumber
    nativeTokenBalance, // amount of ETH BigNumber
  } = balances
} catch (error) {
  console.error(error)
}
```
