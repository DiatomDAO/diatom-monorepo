import { ContractAddresses, getContractAddressesForChainOrThrow } from '@diatom/sdk';
import { ChainId } from '@usedapp/core';

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
  ipfsUri: string;
}

type SupportedChains = ChainId.Rinkeby | ChainId.Mainnet | ChainId.Hardhat;

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '4');

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return custom || `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return custom || `wss://${network}.infura.io/ws/v3/${INFURA_PROJECT_ID}`;
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/diatomdao/diatom-subgraph-rinkeby-v3',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
    ipfsUri: 'bafybeiczss6g3bto5xv4ebabmo2wnwdrdnmtow4qjhrwzhog2lcguc72ka',
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/diatomdao/auction-house',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
    ipfsUri: 'bafybeihcokvmsq73ao6daq6z23cd6mugwldr3odsfwy7nzdzubskylluma',
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: 'http://0.0.0.0:8000/subgraphs/name/diatomdao/diatom-subgraph',
    enableHistory: false,
    ipfsUri: 'bafybeiczss6g3bto5xv4ebabmo2wnwdrdnmtow4qjhrwzhog2lcguc72ka',
  },
};

const getAddresses = () => {
  try {
    return getContractAddressesForChainOrThrow(CHAIN_ID);
  } catch {
    return {} as ContractAddresses;
  }
};

const config = {
  app: app[CHAIN_ID],
  addresses: getAddresses(),
};

export default config;
