import { task } from 'hardhat/config';

type ContractName =
  | 'WhalezToken'
  | 'WhalezAuctionHouse'
  | 'WhalezAuctionHouseProxyAdmin'
  | 'WhalezAuctionHouseProxy';

interface VerifyArgs {
  address: string;
  constructorArguments?: (string | number)[];
  libraries?: Record<string, string>;
}

const contracts: Record<ContractName, VerifyArgs> = {
  WhalezToken: {
    address: '0x635FE0cF6C5BeE0e6a2b90a8c0fa8D633B18E104',
    constructorArguments: [
      '0xC8378f71E241905D9F17CeE60b7bbfbC0D42FabF',
      '0xe8d80BEda114708d854069dbFf513b65BcA883be',
      '0xa5409ec958c83c3f309868babaca7c86dcb077c1',
      '0x3b6261667962656968636f6b766d73713733616f36646171367a32336364366d7567776c6472336f6473667779376e7a647a7562736b796c6c756d610000000000',
    ],
  },
  WhalezAuctionHouse: {
    address: '0x2FB544387EeE5581af3372448b4b6F1148b01525',
  },
  WhalezAuctionHouseProxyAdmin: {
    address: '0xFA6345CC43c842253A7ed082649fE7BC3BF3dEf6',
  },
  WhalezAuctionHouseProxy: {
    address: '0xe8d80BEda114708d854069dbFf513b65BcA883be',
    constructorArguments: [
      '0x2FB544387EeE5581af3372448b4b6F1148b01525',
      '0xFA6345CC43c842253A7ed082649fE7BC3BF3dEf6',
      '0x5b1987cd000000000000000000000000635fe0cf6c5bee0e6a2b90a8c0fa8d633b18e104000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000005',
    ],
  },

};

task('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {
  for (const [name, args] of Object.entries(contracts)) {
    console.log(`verifying ${name}...`);
    try {
      await hre.run('verify:verify', {
        ...args,
      });
    } catch (e) {
      console.error(e);
    }
  }
});
