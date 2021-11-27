# Diatom-monorepo

DiatomDAO

## Contributing

If you're interested in contributing to Diatom DAO repos we're excited to have you. Please discuss any changes in `#developers` in [discord.gg/diatom](https://discord.gg/diatomdao) prior to contributing to reduce duplication of effort and in case there is any prior art that may be useful to you.

## Packages

### diatom-contracts

The [diatom contracts](packages/diatom-contracts) is the suite of Solidity contracts powering Diatom DAO.

### diatom-sdk

The [diatom sdk](packages/diatom-sdk) exposes the Diatom contract addresses, ABIs, and instances as well as image encoding and SVG building utilities.

### diatom-subgraph

In order to make retrieving more complex data from the auction history, [diatom subgraph](packages/diatom-subgraph) contains subgraph manifests that are deployed onto [The Graph](https://thegraph.com).

### diatom-webapp

The [diatom webapp](packages/diatom-webapp) is the frontend for interacting with Diatom auctions as hosted at [diatom.wtf](https://diatom.wtf).

## Quickstart

### Install dependencies

```sh
yarn
```

### Build all packages

```sh
yarn build
```

### Run Linter

```sh
yarn lint
```

### Run Prettier

```sh
yarn format
```
