# StakeWise Widget

[![Discord](https://user-images.githubusercontent.com/7288322/34471967-1df7808a-efbb-11e7-9088-ed0b04151291.png)](https://discord.gg/2BSdr2g)

The package contains a JavaScript class that renders a
widget on an HTML page that allows depositing ETH in
staking and get deposit data.

The package uses JavaScript class from StakeWise-Methods
package.

#### [DEMO](https://js-hsyeti1z3-stakewise.vercel.app/)

### Create an instance of a class
To create widget instance you need to provide the same
options as for StakeWise-Methods instance, since it will
use that methods inside.

Required options are: [ethers provider](https://docs.ethers.io/v5/api/providers/provider/), wallet address and
referral address.

```js
import Widget from 'stakewise-widget'

const widget = new Widget({
  provider, // ethers provider - https://docs.ethers.io/v5/api/providers/provider/
  address, // wallet address
  referral, // referral address
})
```

You can also provide callbacks to the widget class to
track some events and handle errors. 

Callbacks are optional, you can provide only some of
them or not provide them at all.

```js
import Widget from 'stakewise-widget'

// optional property to render widget in 'dark' or 'light' colors
// 'light' by default
const theme = 'light' // or 'dark'

// optional property to render widget overlay in 'dark' color render 'blur' overlay
// 'dark' by default
const overlay = 'dark' // or 'blur'

// optional callback will be called after successful depositing
const onSuccess = (amount: BigNumber) => {
  console.log(`Deposited: ${BigNumber.toString()}`)
}

// optional callback will be called on any error
const onError = ({ method, error }: { method: string, error: Error }) => {
  console.error(`[${method}]: ${error.message}`)
}

// optional callback will be called on widget closing,
// except cases when you close it using method `widget.close()` 
const onClose = () => {
  console.log('Widget has been closed')
}

const windget = new Widget({
  provider, // web3 provider
  address, // wallet address
  referral, // referral address
  theme,
  overlay,
  onSuccess, 
  onError, 
  onClose,  
})
```

### Open widget
This method will create the widget in a modal window on
the page:

```js
windget.open()
```

### Close widget
This method will remove the widget and its modal window
from the page:

```js
windget.close()
```

If you've provided `onClose` callback to the widget, it
won't be called in this case, since it is called only
when the widget is closing from the inside.

For example, the callback will be called if a user
clicks on the cross button in the top right corner of
the widget modal which will cause widget closing.
