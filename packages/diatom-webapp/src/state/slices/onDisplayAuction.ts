import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnDisplayAuctionState {
  lastAuctionWhalezId: number | undefined;
  onDisplayAuctionWhalezId: number | undefined;
}

const initialState: OnDisplayAuctionState = {
  lastAuctionWhalezId: undefined,
  onDisplayAuctionWhalezId: undefined,
};

const onDisplayAuction = createSlice({
  name: 'onDisplayAuction',
  initialState: initialState,
  reducers: {
    setLastAuctionWhalezId: (state, action: PayloadAction<number>) => {
      state.lastAuctionWhalezId = action.payload;
    },
    setOnDisplayAuctionWhalezId: (state, action: PayloadAction<number>) => {
      state.onDisplayAuctionWhalezId = action.payload;
    },
    setPrevOnDisplayAuctionWhalezId: state => {
      if (!state.onDisplayAuctionWhalezId) return;
      if (state.onDisplayAuctionWhalezId === 0) return;
      state.onDisplayAuctionWhalezId = state.onDisplayAuctionWhalezId - 1;
    },
    setNextOnDisplayAuctionWhalezId: state => {
      if (state.onDisplayAuctionWhalezId === undefined) return;
      if (state.lastAuctionWhalezId === state.onDisplayAuctionWhalezId) return;
      state.onDisplayAuctionWhalezId = state.onDisplayAuctionWhalezId + 1;
    },
  },
});

export const {
  setLastAuctionWhalezId,
  setOnDisplayAuctionWhalezId,
  setPrevOnDisplayAuctionWhalezId,
  setNextOnDisplayAuctionWhalezId,
} = onDisplayAuction.actions;

export default onDisplayAuction.reducer;
