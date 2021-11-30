import { ChainId, ContractAddresses } from './types';

const chainIdToAddresses: { [chainId: number]: ContractAddresses } = {
  [ChainId.Mainnet]: {
    whalezToken: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    whalezAuctionHouse: '0xF15a943787014461d94da08aD4040f79Cd7c124e',
    whalezAuctionHouseProxy: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
    whalezAuctionHouseProxyAdmin: '0xC1C119932d78aB9080862C5fcb964029f086401e',
  },
  [ChainId.Rinkeby]: {
    whalezToken: '0x84b2f801fd059377A8667775d8D5C120587bb386',
    whalezAuctionHouse: '0x80fd6D06A9Cbd0aA602dedB89cE011A36fb3a298',
    whalezAuctionHouseProxy: '0x4336CB0A99808334d478162d571208B1C5dEc43b',
    whalezAuctionHouseProxyAdmin: '0x2ac3935cEAEDE4be5e814644528ED8DB46287aAb',
  },
  [ChainId.Local]: {
    whalezToken: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    whalezAuctionHouse: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    whalezAuctionHouseProxy: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    whalezAuctionHouseProxyAdmin: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    Multicall: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  },
};

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param chainId The desired chainId
 */
export const getContractAddressesForChainOrThrow = (chainId: number): ContractAddresses => {
  if (!chainIdToAddresses[chainId]) {
    throw new Error(
      `Unknown chain id (${chainId}). No known contracts have been deployed on this chain.`,
    );
  }
  return chainIdToAddresses[chainId];
};
