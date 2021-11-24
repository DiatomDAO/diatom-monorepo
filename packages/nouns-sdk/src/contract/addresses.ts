import { ChainId, ContractAddresses } from './types';

const chainIdToAddresses: { [chainId: number]: ContractAddresses } = {
  [ChainId.Mainnet]: {
    whalezToken: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    whalezAuctionHouse: '0xF15a943787014461d94da08aD4040f79Cd7c124e',
    whalezAuctionHouseProxy: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
    whalezAuctionHouseProxyAdmin: '0xC1C119932d78aB9080862C5fcb964029f086401e',
  },
  [ChainId.Rinkeby]: {
    whalezToken: '0x632f34c3aee991b10D4b421Bc05413a03d7a37eB',
    whalezAuctionHouse: '0xfAB74e535409A3ad1F7C2858dd2E5Da1eAAc6cE7',
    whalezAuctionHouseProxy: '0x7cb0384b923280269b3BD85f0a7fEaB776588382',
    whalezAuctionHouseProxyAdmin: '0x04d0e5a8ADB5076C098f49F39B01A774c313597d',
  },
  [ChainId.Local]: {
    whalezToken: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    whalezAuctionHouse: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    whalezAuctionHouseProxy: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    whalezAuctionHouseProxyAdmin: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
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
