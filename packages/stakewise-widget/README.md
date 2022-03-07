# StakeWise Widget

[![Discord](https://user-images.githubusercontent.com/7288322/34471967-1df7808a-efbb-11e7-9088-ed0b04151291.png)](https://discord.gg/2BSdr2g)

The package contains a JavaScript class that renders a widget on
an HTML page that allows depositing ETH in staking and get
deposit data.

The package uses JavaScript class from StakeWise-Methods
package. 

### Create an instance of a class
```js
import Widget from 'stakewise-widget'

const windget = new Widget({
  onSuccess, // optional callback will be called after successful depositing
  onError, // optional callback will be called on any error
  onClose, // optional callback will be called on widget closing 
})
```

### Open widget
```js
windget.open()
```

### Close widget
```js
windget.close()
```
