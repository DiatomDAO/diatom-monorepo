import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { constants } from 'ethers';
import { ethers, upgrades } from 'hardhat';
import { MaliciousBidderFactory, WhalezAuctionHouse, WhalezToken, Weth } from '../typechain';
import { deployWhalezToken, deployWeth } from './utils';

chai.use(solidity);
const { expect } = chai;

describe('WhalezAuctionHouse', () => {
  let whalezAuctionHouse: WhalezAuctionHouse;
  let whalezToken: WhalezToken;
  let weth: Weth;
  let deployer: SignerWithAddress;
  let diatomDao: SignerWithAddress;
  let bidderA: SignerWithAddress;
  let bidderB: SignerWithAddress;
  let snapshotId: number;
  let originalMinterSnapshotId: number;

  const TIME_BUFFER = 15 * 60;
  const RESERVE_PRICE = 2;
  const MIN_INCREMENT_BID_PERCENTAGE = 5;
  const DURATION = Math.trunc(0.03571 * 1166406 + 4020);

  async function deploy(deployer?: SignerWithAddress) {
    const auctionHouseFactory = await ethers.getContractFactory('WhalezAuctionHouse', deployer);
    return upgrades.deployProxy(auctionHouseFactory, [
      whalezToken.address,
      weth.address,
      TIME_BUFFER,
      RESERVE_PRICE,
      MIN_INCREMENT_BID_PERCENTAGE,
    ]) as Promise<WhalezAuctionHouse>;
  }

  before(async () => {
    [deployer, diatomDao, bidderA, bidderB] = await ethers.getSigners();

    whalezToken = await deployWhalezToken(deployer, diatomDao.address, deployer.address);
    weth = await deployWeth(deployer);
    whalezAuctionHouse = await deploy(deployer);
    originalMinterSnapshotId = await ethers.provider.send('evm_snapshot', []);

    await whalezToken.setMinter(whalezAuctionHouse.address);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await ethers.provider.send('evm_revert', [snapshotId]);
  });

  it('should revert if a second initialization is attempted', async () => {
    const tx = whalezAuctionHouse.initialize(
      whalezToken.address,
      weth.address,
      TIME_BUFFER,
      RESERVE_PRICE,
      MIN_INCREMENT_BID_PERCENTAGE,
    );
    await expect(tx).to.be.revertedWith('Initializable: contract is already initialized');
  });

  it('should allow the diatomDao to unpause the contract and create the first auction', async () => {
    const tx = await whalezAuctionHouse.unpause();
    await tx.wait();

    const auction = await whalezAuctionHouse.auction();
    expect(auction.startTime.toNumber()).to.be.greaterThan(0);
  });

  it('should revert if a user creates a bid for an inactive auction', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();
    const tx = whalezAuctionHouse.connect(bidderA).createBid(whaleId.add(1), {
      value: RESERVE_PRICE,
    });

    await expect(tx).to.be.revertedWith('Whale not up for auction');
  });

  it('should revert if a user creates a bid for an expired auction', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 25]); // Add 25 hours

    const { whaleId } = await whalezAuctionHouse.auction();
    const tx = whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });

    await expect(tx).to.be.revertedWith('Auction expired');
  });

  it('should revert if a user creates a bid with an amount below the reserve price', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();
    const tx = whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE - 1,
    });

    await expect(tx).to.be.revertedWith('Must send at least reservePrice');
  });

  it('should revert if a user creates a bid less than the min bid increment percentage', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();
    await whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE * 50,
    });
    const tx = whalezAuctionHouse.connect(bidderB).createBid(whaleId, {
      value: RESERVE_PRICE * 51,
    });

    await expect(tx).to.be.revertedWith(
      'Must send more than last bid by minBidIncrementPercentage amount',
    );
  });

  it('should refund the previous bidder when the following user creates a bid', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();
    await whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });

    const bidderAPostBidBalance = await bidderA.getBalance();
    await whalezAuctionHouse.connect(bidderB).createBid(whaleId, {
      value: RESERVE_PRICE * 2,
    });
    const bidderAPostRefundBalance = await bidderA.getBalance();

    expect(bidderAPostRefundBalance).to.equal(bidderAPostBidBalance.add(RESERVE_PRICE));
  });

  it('should cap the maximum bid griefing cost at 30K gas + the cost to wrap and transfer WETH', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();

    const maliciousBidderFactory = new MaliciousBidderFactory(bidderA);
    const maliciousBidder = await maliciousBidderFactory.deploy();

    const maliciousBid = await maliciousBidder
      .connect(bidderA)
      .bid(whalezAuctionHouse.address, whaleId, {
        value: RESERVE_PRICE,
      });
    await maliciousBid.wait();

    const tx = await whalezAuctionHouse.connect(bidderB).createBid(whaleId, {
      value: RESERVE_PRICE * 2,
      gasLimit: 1_000_000,
    });
    const result = await tx.wait();

    expect(result.gasUsed.toNumber()).to.be.lessThan(200_000);
    expect(await weth.balanceOf(maliciousBidder.address)).to.equal(RESERVE_PRICE);
  });

  it('should emit an `AuctionBid` event on a successful bid', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();
    const tx = whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });

    await expect(tx)
      .to.emit(whalezAuctionHouse, 'AuctionBid')
      .withArgs(whaleId, bidderA.address, RESERVE_PRICE, false);
  });

  it('should emit an `AuctionExtended` event if the auction end time is within the time buffer', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId, endTime } = await whalezAuctionHouse.auction();

    await ethers.provider.send('evm_setNextBlockTimestamp', [endTime.sub(60 * 5).toNumber()]); // Subtract 5 mins from current end time

    const tx = whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });

    await expect(tx)
      .to.emit(whalezAuctionHouse, 'AuctionExtended')
      .withArgs(whaleId, endTime.add(60 * 10));
  });

  it('should revert if auction settlement is attempted while the auction is still active', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();

    await whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });
    const tx = whalezAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    await expect(tx).to.be.revertedWith("Auction hasn't completed");
  });

  it('should emit `AuctionSettled` and `AuctionCreated` events if all conditions are met', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();

    await whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });

    await ethers.provider.send('evm_increaseTime', [DURATION + 3600]); // Add 14 hours
    const tx = await whalezAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    const receipt = await tx.wait();
    const { timestamp } = await ethers.provider.getBlock(receipt.blockHash);

    const settledEvent = receipt.events?.find(e => e.event === 'AuctionSettled');
    const createdEvent = receipt.events?.find(e => e.event === 'AuctionCreated');

    expect(settledEvent?.args?.whaleId).to.equal(whaleId);
    expect(settledEvent?.args?.winner).to.equal(bidderA.address);
    expect(settledEvent?.args?.amount).to.equal(RESERVE_PRICE);

    expect(createdEvent?.args?.whaleId).to.equal(whaleId.add(1));
    expect(createdEvent?.args?.startTime).to.equal(timestamp);
    expect(createdEvent?.args?.endTime).to.equal(timestamp + DURATION);
  });

  it('should not create a new auction if the auction house is paused and unpaused while an auction is ongoing', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    await (await whalezAuctionHouse.pause()).wait();

    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();

    expect(whaleId).to.equal(1);
  });

  it('should create a new auction if the auction house is paused and unpaused after an auction is settled', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();

    await whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 25]); // Add 25 hours

    await (await whalezAuctionHouse.pause()).wait();

    const settleTx = whalezAuctionHouse.connect(bidderA).settleAuction();

    await expect(settleTx)
      .to.emit(whalezAuctionHouse, 'AuctionSettled')
      .withArgs(whaleId, bidderA.address, RESERVE_PRICE);

    const unpauseTx = await whalezAuctionHouse.unpause();
    const receipt = await unpauseTx.wait();
    const { timestamp } = await ethers.provider.getBlock(receipt.blockHash);

    const createdEvent = receipt.events?.find(e => e.event === 'AuctionCreated');

    expect(createdEvent?.args?.whaleId).to.equal(whaleId.add(1));
    expect(createdEvent?.args?.startTime).to.equal(timestamp);
    expect(createdEvent?.args?.endTime).to.equal(timestamp + DURATION);
  });

  it('should settle the current auction and pause the contract if the minter is updated while the auction house is unpaused', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();

    await whalezAuctionHouse.connect(bidderA).createBid(whaleId, {
      value: RESERVE_PRICE,
    });

    await whalezToken.setMinter(constants.AddressZero);

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 25]); // Add 25 hours

    const settleTx = whalezAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    await expect(settleTx)
      .to.emit(whalezAuctionHouse, 'AuctionSettled')
      .withArgs(whaleId, bidderA.address, RESERVE_PRICE);

    const paused = await whalezAuctionHouse.paused();

    expect(paused).to.equal(true);
  });

  it('should transfer whale to diatomDAO on auction settlement if no bids are received', async () => {
    await (await whalezAuctionHouse.unpause()).wait();

    const { whaleId } = await whalezAuctionHouse.auction();

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 14]); // Add 14 hours

    const tx = whalezAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    await expect(tx)
      .to.emit(whalezAuctionHouse, 'AuctionSettled')
      .withArgs(whaleId, deployer.address, 0);
  });

  it('should not create new auction after 50 whales have been sold', async () => {
    await ethers.provider.send('evm_revert', [originalMinterSnapshotId]);

    const totalWhalezSupply = Array.from(Array(50).keys());
    await Promise.all(
      totalWhalezSupply.map(async () => {
        return await (await whalezToken.mint()).wait();
      }),
    );

    await whalezToken.setMinter(whalezAuctionHouse.address);

    await (await whalezToken.setMinter(whalezAuctionHouse.address)).wait();

    const tx = await (await whalezAuctionHouse.unpause()).wait();

    expect(tx.events?.filter(e => e.event === 'Paused').length).to.equal(1);
    expect(tx.events?.find(e => e.event === 'AuctionCreated')).to.be.undefined;
  });
});
