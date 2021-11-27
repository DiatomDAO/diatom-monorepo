import { useContractCall, useEthers } from '@usedapp/core';
import { BigNumber as EthersBN, utils } from 'ethers';
import { WhalezTokenABI } from '@nouns/contracts';
import config from '../config';

export interface IWhaleToken {
  name: string;
  description: string;
  image: string;
}

export interface INounSeed {
  accessory: number;
  background: number;
  body: number;
  glasses: number;
  head: number;
}

const abi = new utils.Interface(WhalezTokenABI);

export const useWhaleToken = (whaleId: EthersBN) => {
  const [whaleURI] =
    useContractCall<[string]>({
      abi,
      address: config.addresses.whalezToken,
      method: 'tokenURI',
      args: [whaleId],
    }) || [];

  if (!whaleURI) {
    return;
  }

  return whaleURI;
};

export const useUserVotes = (): number | undefined => {
  const { account } = useEthers();
  const [votes] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.whalezToken,
      method: 'getCurrentVotes',
      args: [account],
    }) || [];
  return votes?.toNumber();
};

export const useUserDelegatee = (): string | undefined => {
  const { account } = useEthers();
  const [delegate] =
    useContractCall<[string]>({
      abi,
      address: config.addresses.whalezToken,
      method: 'delegates',
      args: [account],
    }) || [];
  return delegate;
};

export const useUserVotesAsOfBlock = (block: number | undefined): number | undefined => {
  const { account } = useEthers();

  // Check for available votes
  const [votes] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.whalezToken,
      method: 'getPriorVotes',
      args: [account, block],
    }) || [];
  return votes?.toNumber();
};
