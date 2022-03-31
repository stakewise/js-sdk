# StakeWise Dev
The package contains a React app that renders StakeWise Widget.

For development purposes we extend Widget and Methods classes
to be able to test goerli testnet.

In the extended Methods class we also mock fiat rates request
since there is no contracts similar to mainnet.

Extended Widget class needed only to use extended Methods class.

### How to start development

- Very first launch requires to have Methods and Widget packages built.
So we need to call `npm run build` before `npm run dev`.
- Subsequent updates in Methods or Widget packages will start build
automatically if `npm run build` is running.
- Also, no need to run `npm run build` again if there are no changes after
the last development session

