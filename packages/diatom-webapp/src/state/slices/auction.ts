import { BigNumber } from '@ethersproject/bignumber';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuctionCreateEvent,
  AuctionExtendedEvent,
  AuctionSettledEvent,
  BidEvent,
} from '../../utils/types';
import { Auction as IAuction } from '../../wrappers/whalezAuction';

export interface AuctionState {
  activeAuction?: IAuction;
  bids: BidEvent[];
}

const initialState: AuctionState = {
  activeAuction: undefined,
  bids: [],
};

export const reduxSafePastAuction = (auction: any): AuctionState => {
  return {
    activeAuction: {
      amount: BigNumber.from(auction.amount).toJSON(),
      bidder: auction.bidder ? auction.bidder.id : '',
      startTime: BigNumber.from(auction.startTime).toJSON(),
      endTime: BigNumber.from(auction.endTime).toJSON(),
      whaleId: BigNumber.from(auction.id).toJSON(),
      settled: false,
    },
    bids: auction.bids.map((bid: any) => {
      return {
        whaleId: BigNumber.from(auction.id).toJSON(),
        sender: bid.bidder.id,
        value: BigNumber.from(bid.amount).toJSON(),
        extended: false,
        transactionHash: bid.id,
        timestamp: BigNumber.from(bid.blockTimestamp).toJSON(),
      };
    }),
  };
};

export const reduxSafeNewAuction = (auction: AuctionCreateEvent): IAuction => ({
  amount: BigNumber.from(0).toJSON(),
  bidder: '',
  startTime: BigNumber.from(auction.startTime).toJSON(),
  endTime: BigNumber.from(auction.endTime).toJSON(),
  whaleId: BigNumber.from(auction.whaleId).toJSON(),
  settled: false,
});

export const reduxSafeAuction = (auction: IAuction): IAuction => ({
  amount: BigNumber.from(auction.amount).toJSON(),
  bidder: auction.bidder,
  startTime: BigNumber.from(auction.startTime).toJSON(),
  endTime: BigNumber.from(auction.endTime).toJSON(),
  whaleId: BigNumber.from(auction.whaleId).toJSON(),
  settled: auction.settled,
});

export const reduxSafeBid = (bid: BidEvent): BidEvent => ({
  whaleId: BigNumber.from(bid.whaleId).toJSON(),
  sender: bid.sender,
  value: BigNumber.from(bid.value).toJSON(),
  extended: bid.extended,
  transactionHash: bid.transactionHash,
  timestamp: bid.timestamp,
});

const maxBid = (bids: BidEvent[]): BidEvent => {
  return bids.reduce((prev, current) => {
    return BigNumber.from(prev.value).gt(BigNumber.from(current.value)) ? prev : current;
  });
};

const auctionsEqual = (
  a: IAuction,
  b: AuctionSettledEvent | AuctionCreateEvent | BidEvent | AuctionExtendedEvent,
) => BigNumber.from(a.whaleId).eq(BigNumber.from(b.whaleId));

const containsBid = (bidEvents: BidEvent[], bidEvent: BidEvent) =>
  bidEvents.map(bid => bid.transactionHash).indexOf(bidEvent.transactionHash) >= 0;

/**
 * State of **current** auction (sourced via websocket)
 */
export const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    setActiveAuction: (state, action: PayloadAction<AuctionCreateEvent>) => {
      state.activeAuction = reduxSafeNewAuction(action.payload);
      state.bids = [];
      console.log('processed auction create', action.payload);
    },
    setFullAuction: (state, action: PayloadAction<AuctionState>) => {
      console.log(`from set full auction: `, action.payload);
      state.activeAuction = reduxSafeAuction(action.payload.activeAuction as IAuction);
      state.bids = action.payload.bids.map(e => reduxSafeBid(e));
    },
    appendBid: (state, action: PayloadAction<BidEvent>) => {
      if (!(state.activeAuction && auctionsEqual(state.activeAuction, action.payload))) return;
      if (containsBid(state.bids, action.payload)) return;
      state.bids = [reduxSafeBid(action.payload), ...state.bids];
      const maxBid_ = maxBid(state.bids);
      state.activeAuction.amount = BigNumber.from(maxBid_.value).toJSON();
      state.activeAuction.bidder = maxBid_.sender;
      console.log('processed bid', action.payload);
    },
    setAuctionSettled: (state, action: PayloadAction<AuctionSettledEvent>) => {
      if (!(state.activeAuction && auctionsEqual(state.activeAuction, action.payload))) return;
      state.activeAuction.settled = true;
      state.activeAuction.bidder = action.payload.winner;
      state.activeAuction.amount = BigNumber.from(action.payload.amount).toJSON();
      console.log('processed auction settled', action.payload);
    },
    setAuctionExtended: (state, action: PayloadAction<AuctionExtendedEvent>) => {
      if (!(state.activeAuction && auctionsEqual(state.activeAuction, action.payload))) return;
      state.activeAuction.endTime = BigNumber.from(action.payload.endTime).toJSON();
      console.log('processed auction extended', action.payload);
    },
  },
});

export const {
  setActiveAuction,
  appendBid,
  setAuctionExtended,
  setAuctionSettled,
  setFullAuction,
} = auctionSlice.actions;

export default auctionSlice.reducer;
