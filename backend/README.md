# A library to make use of Beacon SDK from your Node.js script
`tezos-builder-suite` is a package that exposes to your application an easy interface to let user interact with [Tezos](https://tezos.com) Smart Contracts with [Taquito](https://tezostaquito.io) and the [Beacon SDK](https://www.walletbeacon.io) through the infrastructure of a small [Apollo GraphQL server](https://www.apollographql.com) and a [React.js](https://reactjs.org) browser client.

All you need to do is just launch the tool providing contract(s) code, contract(s) compiled Michelson and the Tezos endpoint to connect to.

## Installation
```bash
yarn add tezos-builder-suite
```
or
```bash
npm i --save tezos-builder-suite
```

## Usage
In a JavaScript project, you can use:
```js
const { launchDeployer, NetworkType } = require('tezos-builder-suite');

const endpoint = {
  url: "https://mainnet-tezos.giganode.io/",
  scope: "mainnet",
  protocolVersion: NetworkType.MAINNET,
};

const contracts = [
  {
    name: "MyContract.ligo", // File name
    code: '...', // Contract source code
    michelson: '...', // Compiled contract JSON-Michelson code
  },
];

launchDeployer({ 
  endpoint,
  contracts
}, { openBrowser: true });
```

or, if like us you prefer to write in TypeScript, you can go with:
```typescript
import { launchDeployer, Contract, Endpoint, NetworkType } from 'tezos-builder-suite';

const endpoint: Endpoint = {
  url: "https://mainnet-tezos.giganode.io/",
  scope: "mainnet",
  protocolVersion: NetworkType.MAINNET,
};

const contracts: Contract[] = [
  {
    name: "MyContract.ligo", // File name
    code: '...', // Contract source code
    michelson: '...', // Compiled contract JSON-Michelson code
  },
];

launchDeployer({ 
  endpoint,
  contracts
}, { openBrowser: true });
```

## Contributing
We'd definitely love to have your contributions to this package.

If you want to write some code, we'll be more than happy to review and discuss every PR. Please refer to our [Contributing guide](../CONTRIBUTING.md) to discover how to work on this repository and how to subit your PRs.

If you like this project, please consider donating to help it evolve along with Tezos ecosystem and protocol updates. As you can imagine, this requires a lot of time and effort, and any donation will support us. Reach us from any support channel to find how to donate in your preferred way.

## Let's get in touch
You can request support, give feedback, suggest features and donate to this project by contacting us in any of the following channels:

- Telegram Uconomy support channel [https://t.me/uconomy](https://t.me/uconomy)
- Uconomy developers Discord [https://discord.gg/Cabq36FVRh](https://discord.gg/Cabq36FVRh)

If you need help with code we'd suggest going for the Discord channel as it's easier to exchange code there.