# StakeWise Methods

[![Discord](https://user-images.githubusercontent.com/7288322/34471967-1df7808a-efbb-11e7-9088-ed0b04151291.png)](https://discord.gg/2BSdr2g)

The package contains a JavaScript class that provides
methods to deposit ETH in staking and get deposit data.

### Create an instance of a class
To create methods instance you need to provide Web3 provider,
wallet address and referral address:

```js
import Methods from 'stakewise-methods'

const methods = new Methods({
  provider, // web3 provider
  address, // wallet address
  referral, // referral address
})
```

### Fetching token balances
Method `getBalances` returns balances of SWISE tokens, staked
tokens, reward tokens and native tokens.

A balance for every token it is an object called below as
`TokenValue`. It contains properties: 
- `value` - token balance in `BigNumber`
- and `fiatValues` - object that contains fiat values in USD,
EUR and GBP

```typescript
type TokenValue = {
  value: BigNumber
  fiatValues: {
    usd: number
    eur: number
    gbp: number
  }
}
```
```js
try {
  const balances = await methods.getBalances()

  const {
    swiseTokenBalance, // TokenValue with amount of SWISE 
    stakedTokenBalance, // TokenValue with amount of staked tokens (e.g. sETH2)
    rewardTokenBalance, // TokenValue with amount of reward tokens (e.g. rETH2)
    nativeTokenBalance, // TokenValue with amount of native tokens (e.g. ETH)
  } = balances

  // Formatted balance of native tokens (e.g. 0.318871759160055215)
  const nativeTokenValue = formatEther(nativeTokenBalance.value)

  // Formatted balance in USD (e.g. $956.35)
  const nativeTokenFiatValue = `$${nativeTokenBalance.fiatValues.usd}`
} catch (error) {
  console.error(error)
}
```

### Fetching staking APR
StakingApr is a `number` of the annual yield percent.
```js
try {
  const stakingApr = await methods.getStakingApr()
} catch (error) {
  console.error(error)
}
```

### Deposit
The deposit method allows sending available `amount` of
native tokens (e.g. ETH) and receiving as the result
staked tokens (e.g. sETH2).

Staked tokens by default will be submitted to the
sender wallet, but could be submitted to another
wallet (if `address` is provided).

```js
try {
  const transaction = await methods.deposit({
    amount, // BigNumber with amount to deposit
    address, // Optional recipient wallet address (current wallet address by default)
  })
  
  // Wait for transaction confirmation
  if (transaction && transaction.hash) {
    await provider.waitForTransaction(transaction.hash)
  }
} catch (error) {
  console.error(error)
}
```
