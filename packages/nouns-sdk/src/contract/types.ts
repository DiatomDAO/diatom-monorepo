import {
  WhalezTokenFactory,
  WhalezAuctionHouseFactory,
  NounsDaoLogicV1Factory,
} from '@nouns/contracts';

export interface ContractAddresses {
  nounsToken: string;
  nounsSeeder: string;
  nounsDescriptor: string;
  nftDescriptor: string;
  nounsAuctionHouse: string;
  nounsAuctionHouseProxy: string;
  nounsAuctionHouseProxyAdmin: string;
  nounsDaoExecutor: string;
  nounsDAOProxy: string;
  nounsDAOLogicV1: string;
}

export interface Contracts {
  nounsTokenContract: ReturnType<typeof WhalezTokenFactory.connect>;
  nounsAuctionHouseContract: ReturnType<typeof WhalezAuctionHouseFactory.connect>;
  nounsDaoContract: ReturnType<typeof NounsDaoLogicV1Factory.connect>;
}

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42,
  Local = 31337,
}
