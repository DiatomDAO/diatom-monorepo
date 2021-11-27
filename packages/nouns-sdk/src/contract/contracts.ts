import { WhalezTokenFactory, WhalezAuctionHouseFactory } from '@nouns/contracts';
import type { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { getContractAddressesForChainOrThrow } from './addresses';
import { Contracts } from './types';

/**
 * Get contract instances that target the Ethereum mainnet
 * or a supported testnet. Throws if there are no known contracts
 * deployed on the corresponding chain.
 * @param chainId The desired chain id
 * @param signerOrProvider The ethers v5 signer or provider
 */
export const getContractsForChainOrThrow = (
  chainId: number,
  signerOrProvider?: Signer | Provider,
): Contracts => {
  const addresses = getContractAddressesForChainOrThrow(chainId);

  return {
    whalezTokenContract: WhalezTokenFactory.connect(
      addresses.whalezToken,
      signerOrProvider as Signer | Provider,
    ),
    whalezAuctionHouseContract: WhalezAuctionHouseFactory.connect(
      addresses.whalezAuctionHouseProxy,
      signerOrProvider as Signer | Provider,
    ),
  };
};
