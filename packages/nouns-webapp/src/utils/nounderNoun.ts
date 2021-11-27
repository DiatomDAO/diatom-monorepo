import { Auction } from '../wrappers/nounsAuction';
import { AuctionState } from '../state/slices/auction';
import { BigNumber } from '@ethersproject/bignumber';

export const isNounderNoun = (whaleId: BigNumber) => {
  return whaleId.mod(10).eq(0) || whaleId.eq(0);
};

const emptyNounderAuction = (onDisplayAuctionId: number): Auction => {
  return {
    amount: BigNumber.from(0).toJSON(),
    bidder: '',
    startTime: BigNumber.from(0).toJSON(),
    endTime: BigNumber.from(0).toJSON(),
    whaleId: BigNumber.from(onDisplayAuctionId).toJSON(),
    settled: false,
  };
};

const findAuction = (id: BigNumber, auctions: AuctionState[]): Auction | undefined => {
  return auctions.find(auction => {
    return BigNumber.from(auction.activeAuction?.whaleId).eq(id);
  })?.activeAuction;
};

/**
 *
 * @param whaleId
 * @param pastAuctions
 * @returns empty `Auction` object with `startTime` set to auction after param `whaleId`
 */
export const generateEmptyNounderAuction = (
  whaleId: BigNumber,
  pastAuctions: AuctionState[],
): Auction => {
  const nounderAuction = emptyNounderAuction(whaleId.toNumber());
  // use nounderAuction.whaleId + 1 to get mint time
  const auctionAbove = findAuction(whaleId.add(1), pastAuctions);
  const auctionAboveStartTime = auctionAbove && BigNumber.from(auctionAbove.startTime);
  if (auctionAboveStartTime) nounderAuction.startTime = auctionAboveStartTime.toJSON();

  return nounderAuction;
};
