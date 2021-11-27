import { BigNumber } from '@ethersproject/bignumber';
import { useAppSelector } from '../hooks';
import { Bid, BidEvent } from '../utils/types';
import { Auction } from './whalezAuction';

const deserializeAuction = (reduxSafeAuction: Auction): Auction => {
  return {
    amount: BigNumber.from(reduxSafeAuction.amount),
    bidder: reduxSafeAuction.bidder,
    startTime: BigNumber.from(reduxSafeAuction.startTime),
    endTime: BigNumber.from(reduxSafeAuction.endTime),
    whaleId: BigNumber.from(reduxSafeAuction.whaleId),
    settled: false,
  };
};

const deserializeBid = (reduxSafeBid: BidEvent): Bid => {
  return {
    whaleId: BigNumber.from(reduxSafeBid.whaleId),
    sender: reduxSafeBid.sender,
    value: BigNumber.from(reduxSafeBid.value),
    extended: reduxSafeBid.extended,
    transactionHash: reduxSafeBid.transactionHash,
    timestamp: BigNumber.from(reduxSafeBid.timestamp),
  };
};
const deserializeBids = (reduxSafeBids: BidEvent[]): Bid[] => {
  return reduxSafeBids
    .map(bid => deserializeBid(bid))
    .sort((a: Bid, b: Bid) => {
      return b.timestamp.toNumber() - a.timestamp.toNumber();
    });
};

const useOnDisplayAuction = (): Auction | undefined => {
  const lastAuctionWhalezId = useAppSelector(state => state.auction.activeAuction?.whaleId);
  const onDisplayAuctionWhalezId = useAppSelector(
    state => state.onDisplayAuction.onDisplayAuctionWhalezId,
  );
  const currentAuction = useAppSelector(state => state.auction.activeAuction);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  if (
    onDisplayAuctionWhalezId === undefined ||
    lastAuctionWhalezId === undefined ||
    currentAuction === undefined ||
    !pastAuctions
  )
    return undefined;

  // current auction
  if (BigNumber.from(onDisplayAuctionWhalezId).eq(lastAuctionWhalezId)) {
    return deserializeAuction(currentAuction);
  } else {
    const reduxSafeAuction: Auction | undefined = pastAuctions.find(auction => {
      const whaleId = auction.activeAuction && BigNumber.from(auction.activeAuction.whaleId);
      return whaleId && whaleId.toNumber() === onDisplayAuctionWhalezId;
    })?.activeAuction;

    return reduxSafeAuction ? deserializeAuction(reduxSafeAuction) : undefined;
  }
};

export const useAuctionBids = (auctionWhalezId: BigNumber): Bid[] | undefined => {
  const lastAuctionWhalezId = useAppSelector(state => state.onDisplayAuction.lastAuctionWhalezId);
  const lastAuctionBids = useAppSelector(state => state.auction.bids);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  // auction requested is active auction
  if (lastAuctionWhalezId === auctionWhalezId.toNumber()) {
    return deserializeBids(lastAuctionBids);
  } else {
    // find bids for past auction requested
    const bidEvents: BidEvent[] | undefined = pastAuctions.find(auction => {
      const whaleId = auction.activeAuction && BigNumber.from(auction.activeAuction.whaleId);
      return whaleId && whaleId.eq(auctionWhalezId);
    })?.bids;

    return bidEvents && deserializeBids(bidEvents);
  }
};

export default useOnDisplayAuction;
