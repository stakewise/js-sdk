# StakeWise Methods

[![Discord](https://user-images.githubusercontent.com/7288322/34471967-1df7808a-efbb-11e7-9088-ed0b04151291.png)](https://discord.gg/2BSdr2g)

The package contains a JavaScript class that provides
methods to deposit ETH in staking and get deposit data.

### Create an instance of a class
To create methods instance you need to provide [ethers provider](https://docs.ethers.io/v5/api/providers/provider/),
wallet address and referrer address:

```js
import Methods from 'stakewise-methods'

const methods = new Methods({
  provider, // ethers provider - https://docs.ethers.io/v5/api/providers/provider/
  sender, // wallet address
  referrer, // referrer address
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

<details>
<summary>Click to read how it works</summary>

To get balances we make requests:

1. Get native token balance: `provider.getBalance(sender)`

2. Get staked token balance: `stakedTokenContract.balanceOf(sender)`
   Staked token contract address: `0xFe2e637202056d30016725477c5da089Ab0A043A`

3. Get reward token balance: `rewardTokenContract.balanceOf(sender)`
   Reward token contract address: `0x20BC832ca081b91433ff6c17f85701B6e92486c5`

4. Get SWISE token balance: `swiseTokenContract.balanceOf(sender)`
   SWISE token contract address: `0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2`

5. Get fiat rates to calculate fiat balances:
   `Promise.all([
   ethUsd.latestAnswer(),
   eurUsd.latestAnswer(),
   gbpUsd.latestAnswer(),
   ])
   `

EthUsd rate contract address: `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`

EurUsd rate contract address: `0xb49f677943BC038e9857d61E7d053CaA2C1734C1`

GbpUsd rate contract address: `0x5c0Ab2d9b5a7ed9f470386e82BB36A3613cDd4b5`
</details>

### Fetching staking APR
StakingApr is a `number` of the annual yield percent.

```js
try {
  const stakingApr = await methods.getStakingApr()
} catch (error) {
  console.error(error)
}
```

<details>
<summary>Click to read how it works</summary>

Reward token contract address: `0x20BC832ca081b91433ff6c17f85701B6e92486c5`

- Get reward token protocol fee: `rewardTokenContract.protocolFee()`

- Get pool stats: `https://api.stakewise.io/pool-stats/`
  Returns object with validatorsAPR number

Staking APR calculation:
```javascript
const { validatorsAPR } = poolStats

const maintainerFee = protocolFee.toNumber()
const stakingAPR = validatorsAPR - validatorsAPR * (maintainerFee / 10_000)
```
</details>


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


<details>
<summary>Click to read how it works</summary>

Pool contract address: `0xC874b064f465bdD6411D45734b56fac750Cda29A`

First we are estimating gas, and after that sending
deposit.

To estimate gas we call `this.provider.getFeeData()`
to get `{ maxFeePerGas, maxPriorityFeePerGas }` and
call pool contract gas estimation method.

Depending on provided referrer and receiver addresses
there are different methods should be called.

**Gas estimation with referrer**

On each call we have to provide parameters:<br />
`from` which is the sender address,<br />
and `value` which is the BigNumber amount to deposit.

If receiver address is the same as the address of the
current wallet, we call:

`poolContract.estimateGas.stakeWithReferrer(referrer, { from, value })`

If not, we provide receiver address and call:

`poolContract.estimateGas.stakeWithReferrerOnBehalf(referrer, address, { from, value })`


**Gas estimation without referrer**

If receiver address is the same as the current wallet
address, we call:

`poolContract.estimateGas.stake({ from, value })`

If receiver address is not the same as the current wallet
address, we call:

`poolContract.estimateGas.stakeOnBehalf(address, { from, value })`

As the result in each case we'll receive gasLimit (BigNumber).
This value we increase on 1000 to be able to spend a bit more
gas if it will be needed:

```javascript
const gasLimit = await estimateGas()

return gasLimit
  .mul(10000)
  .add(1000)
  .div(10000)
```

The next step is to send deposit, to make the deposit
call we need to create a signed contract:

```javascript
const signer = provider.getUncheckedSigner(address)
const signedContract = poolContract.connect(signer)
```

Now, after gas estimation we have:

```typescript
maxFeePerGas: null | BigNumber
maxPriorityFeePerGas: null | BigNumber
gasLimit: BigNumber
```

We need to provide these parameters to the next contract call
to send deposit.

The call is similar to gas estimation since it has
different methods that should be called depending on
provided referrer and receiver addresses.

**Deposit with referrer**

If receiver address is the same as the current wallet
address, we call:

`signedContract.stakeWithReferrer(referrer, { maxFeePerGas, maxPriorityFeePerGas, gasLimit })`

If not, we provide receiver address and call:

`signedContract.stakeWithReferrerOnBehalf(referrer, address, { maxFeePerGas, maxPriorityFeePerGas, gasLimit })`

**Deposit without referrer**

If receiver address is the same as the current wallet
address, we call:

`signedContract.stake({ maxFeePerGas, maxPriorityFeePerGas, gasLimit })`

If receiver address is not the same as the current wallet
address, we call:

`signedContract.stakeOnBehalf(address, { maxFeePerGas, maxPriorityFeePerGas, gasLimit })`

As the result in each case we'll receive `ContractTransaction`.
We can wait until transaction will be confirmed and after that
to update balances we can call getBalances()
</details>
