import { default as WhalezAuctionHouseABI } from '../abi/contracts/WhalezAuctionHouse.sol/WhalezAuctionHouse.json';
import { task, types } from 'hardhat/config';
import { Interface } from 'ethers/lib/utils';
import { Contract as EthersContract } from 'ethers';

type ContractName =
  | 'WETH'
  | 'WhalezToken'
  | 'WhalezAuctionHouse'
  | 'WhalezAuctionHouseProxyAdmin'
  | 'WhalezAuctionHouseProxy'
  | 'Multicall';

interface Contract {
  args?: (string | number | (() => string | undefined))[];
  instance?: EthersContract;
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
}

task('deploy-local', 'Deploy contracts to hardhat')
  .addOptionalParam('diatomdao', 'The diatom DAO contract address')
  .addOptionalParam(
    'contractipfsuri',
    'nfts ipfs uri',
    'bafybeiczss6g3bto5xv4ebabmo2wnwdrdnmtow4qjhrwzhog2lcguc72ka',
    types.string,
  )
  .addOptionalParam('auctionTimeBuffer', 'The auction time buffer (seconds)', 30, types.int) // Default: 30 seconds
  .addOptionalParam('auctionReservePrice', 'The auction reserve price (wei)', 1, types.int) // Default: 1 wei
  .addOptionalParam(
    'auctionMinIncrementBidPercentage',
    'The auction min increment bid percentage (out of 100)', // Default: 5%
    5,
    types.int,
  )
  .addOptionalParam('auctionDuration', 'The auction duration (seconds)', 60 * 2, types.int) // Default: 2 minutes
  .setAction(async (args, { ethers }) => {
    const network = await ethers.provider.getNetwork();
    if (network.chainId !== 31337) {
      console.log(`Invalid chain id. Expected 31337. Got: ${network.chainId}.`);
      return;
    }

    const proxyRegistryAddress = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';

    const AUCTION_HOUSE_PROXY_NONCE_OFFSET = 4;

    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getTransactionCount();
    const expectedAuctionHouseProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: nonce + AUCTION_HOUSE_PROXY_NONCE_OFFSET,
    });
    const contracts: Record<ContractName, Contract> = {
      WETH: {},
      WhalezToken: {
        args: [
          args.diatomdao || deployer.address,
          expectedAuctionHouseProxyAddress,
          proxyRegistryAddress,
          args.contractipfsuri,
        ],
      },
      WhalezAuctionHouse: {
        waitForConfirmation: true,
      },
      WhalezAuctionHouseProxyAdmin: {},
      WhalezAuctionHouseProxy: {
        args: [
          () => contracts['WhalezAuctionHouse'].instance?.address,
          () => contracts['WhalezAuctionHouseProxyAdmin'].instance?.address,
          () =>
            new Interface(WhalezAuctionHouseABI).encodeFunctionData('initialize', [
              contracts['WhalezToken'].instance?.address,
              contracts['WETH'].instance?.address,
              args.auctionTimeBuffer,
              args.auctionReservePrice,
              args.auctionMinIncrementBidPercentage,
            ]),
        ],
      },
      Multicall: {},
    };

    for (const [name, contract] of Object.entries(contracts)) {
      const factory = await ethers.getContractFactory(name, {
        libraries: contract?.libraries?.(),
      });

      const deployedContract = await factory.deploy(
        ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
      );

      if (contract.waitForConfirmation) {
        await deployedContract.deployed();
      }

      contracts[name as ContractName].instance = deployedContract;

      console.log(`${name} contract deployed to ${deployedContract.address}`);
    }

    return contracts;
  });
