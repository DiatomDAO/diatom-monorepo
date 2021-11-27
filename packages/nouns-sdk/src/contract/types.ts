import { WhalezTokenFactory, WhalezAuctionHouseFactory } from '@nouns/contracts';

export interface ContractAddresses {
  whalezToken: string;
  whalezAuctionHouse: string;
  whalezAuctionHouseProxy: string;
  whalezAuctionHouseProxyAdmin: string;
  Multicall?: string;
}

export interface Contracts {
  whalezTokenContract: ReturnType<typeof WhalezTokenFactory.connect>;
  whalezAuctionHouseContract: ReturnType<typeof WhalezAuctionHouseFactory.connect>;
}

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42,
  Local = 31337,
}
