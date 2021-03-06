# StakeWise JS-SDK

The repository contains packages:

### [StakeWise Methods](https://github.com/stakewise/js-sdk/tree/main/packages/stakewise-methods)
Contains JavaScript class that includes methods
to deposit ETH in staking and get deposit data.


### [StakeWise Widget](https://github.com/stakewise/js-sdk/tree/main/packages/stakewise-widget)
Contains a JavaScript class that renders a widget on
an HTML page that allows depositing ETH in staking and get
deposit data.

The package uses JavaScript class from StakeWise-Methods
package. 


### [StakeWise Dev](https://github.com/stakewise/js-sdk/tree/main/packages/stakewise-dev)
Contains a React app that renders StakeWise Widget.
It allows testing Widget locally using `goerli` testnet
as well as mainnet.

Also, it compiles changes from Methods and Widget packages
in the runtime, so we could test them right away.


### Before start
Call `npm run prepare`. It will prepare all packages for
further development:
- Install common dependencies
- Install dependencies for all packages
- Generate types for abis in stakewise-methods


### Build packages
To build all packages call command `npm run build` from the
root of the repository.


### Publish packages
WIP
