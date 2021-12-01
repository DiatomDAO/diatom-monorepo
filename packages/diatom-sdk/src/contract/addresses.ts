import { ChainId, ContractAddresses } from './types';

const chainIdToAddresses: { [chainId: number]: ContractAddresses } = {
  [ChainId.Mainnet]: {
    whalezToken: '0x635FE0cF6C5BeE0e6a2b90a8c0fa8D633B18E104',
    whalezAuctionHouse: '0x2FB544387EeE5581af3372448b4b6F1148b01525',
    whalezAuctionHouseProxy: '0xe8d80BEda114708d854069dbFf513b65BcA883be',
    whalezAuctionHouseProxyAdmin: '0xFA6345CC43c842253A7ed082649fE7BC3BF3dEf6',
  },
  [ChainId.Rinkeby]: {
    whalezToken: '0xC6950C810B431833D4Ed8C0a16d2402482B168F9',
    whalezAuctionHouse: '0xd46c68501E0fDb5aA534A1CcF97Bd9F324db07cD',
    whalezAuctionHouseProxy: '0xa67e17Eac2e98fE182F35c4eB908f8b740Cd83f5',
    whalezAuctionHouseProxyAdmin: '0x907Ffb53089e8f3a079A8F6497849e2087f79362',
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
