# Tezos Builder Suite

This package aims to make [Tezos](https://tezos.com) Smart Contract development simpler and more portable.

It makes possible to deploy a Smart Contract in an easier fashion, with an assistant to build the initial contract's storage and the possibility to use your preferred Wallet to sign the deploy operation.

**The package does not expose any CLI tool**, it's a Node.js library which is meant to be included in your toolchain, so that this portable tools can be shipped with your contracts repo.

## Features
- **Built-in storage configuration tool** that works on your compiled contract _JSON-Michelson_ code
- **Supports a wide variety of Wallets** thanks to [Taquito](https://tezostaquito.io) and the [Beacon SDK](https://www.walletbeacon.io)
- A clean, **easy UI** to simplify the whole process
- **Needs just Node.js to run**, no need to download any heavy Docker images
- **Runs locally from your machine**, so no external packages/middleware/website between you and the Tezos network
- Checks your storage against Michelson before trying the deploy itself
- Transparent browser client/local server code
- Supports multi-contracts repositories

## Warning
This project interacts with compiled contracts, which means that we cannot foresee every possible use case as the compiled code depends on what your contract does in the first instance.

We've written our interpreter based on [Michelson spec](https://tezos.gitlab.io/michelson-reference/) and should be able to handle most of contracts, but this feature definitely requires a lot of testing and you might find some thant won't work. If this happen please open an issue or [contact us on support channel](#lets-get-in-touch) to let us fix it.

## Usage
If you want to start developing your Tezos Smart Contracts, we highly recommend to scaffold your repository using our [Tezos toolchain](https://github.com/uconomy/create-tezos-smart-contract), which makes use also of this package with a ton of other tools (compiler, sandbox, testing support, etc.)

If you want to include this package in your toolchain, please refer to the actual [npm package README](./backend/README.md).

## Roadmap
- Testing complex storage scenarios and make sure every use case is covered properly
- Support configuration for estimates calculation (endpoint + faucet are now hardcoded)
- Include callbacks to Node.js library to receive storage content files
- Support multiple Tezos network endpoints and let the user choose where to deploy
- Add other features other than the Deployer

## Contributing
We'd definitely love to have your contributions to this package.

If you want to write some code, we'll be more than happy to review and discuss every PR. Please refer to our [Contributing guide](./CONTRIBUTING.md) to discover how to work on this repository and how to submit your PRs.

If you like this project, please consider donating to help it evolve along with Tezos ecosystem and protocol updates. As you can imagine, this requires a lot of time and effort, and any donation will support us. [Reach us in any support channel](#lets-get-in-touch) to find how to donate in your preferred way.

## Let's get in touch
You can request support, give feedback, suggest features and donate to this project by contacting us in any of the following channels:

- Telegram Uconomy support channel [https://t.me/uconomy](https://t.me/uconomy)
- Uconomy developers Discord [https://discord.gg/Cabq36FVRh](https://discord.gg/Cabq36FVRh)

If you need help with code we'd suggest going for the Discord channel as it's easier to exchange code there.
