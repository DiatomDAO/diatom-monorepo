import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import account from './state/slices/account';
import application from './state/slices/application';
import logs from './state/slices/logs';
import auction, {
  reduxSafeAuction,
  reduxSafeNewAuction,
  reduxSafeBid,
  setActiveAuction,
  setAuctionExtended,
  setAuctionSettled,
  setFullAuction,
} from './state/slices/auction';
import onDisplayAuction, {
  setLastAuctionNounId,
  setOnDisplayAuctionNounId,
} from './state/slices/onDisplayAuction';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import { clientFactory, latestAuctionsQuery } from './wrappers/subgraph';
import { useEffect } from 'react';
import pastAuctions, { addPastAuctions } from './state/slices/pastAuctions';
import LogsUpdater from './state/updaters/logs';
import config, { CHAIN_ID, LOCAL_CHAIN_ID } from './config';
import { WebSocketProvider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, Contract } from 'ethers';
import { NounsAuctionHouseABI } from '@nouns/contracts';
import dotenv from 'dotenv';
import { useAppDispatch } from './hooks';
import { appendBid } from './state/slices/auction';
import { Auction as IAuction } from './wrappers/nounsAuction';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { push } from 'connected-react-router';

dotenv.config();

export const history = createBrowserHistory();

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    account,
    application,
    auction,
    logs,
    pastAuctions,
    onDisplayAuction,
  });

export default function configureStore(preloadedState: any) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  );

  return store;
}

const store = configureStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// prettier-ignore
const useDappConfig = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    [ChainId.Rinkeby]: process.env.REACT_APP_RINKEBY_JSONRPC || `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    [ChainId.Mainnet]: process.env.REACT_APP_MAINNET_JSONRPC || `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    [LOCAL_CHAIN_ID]: "http://localhost:8545"
  },
};

const client = clientFactory(config.subgraphApiUri);

const Updaters = () => {
  return (
    <>
      <LogsUpdater />
    </>
  );
};

const BLOCKS_PER_DAY = 6_500;

const ChainSubscriber: React.FC = () => {
  const dispatch = useAppDispatch();

  const nounPath = (nounId: Number) => `/noun/${nounId}`;

  const loadState = async () => {
    const wsProvider = new WebSocketProvider(config.wsRpcUri);
    const auctionContract = new Contract(
      config.auctionProxyAddress,
      NounsAuctionHouseABI,
      wsProvider,
    );

    const bidFilter = auctionContract.filters.AuctionBid();
    const extendedFilter = auctionContract.filters.AuctionExtended();
    const createdFilter = auctionContract.filters.AuctionCreated();
    const settledFilter = auctionContract.filters.AuctionSettled();
    const processBidFilter = async (
      nounId: BigNumberish,
      sender: string,
      value: BigNumberish,
      extended: boolean,
      event: any,
    ) => {
      const timestamp = (await event.getBlock()).timestamp;
      const transactionHash = event.transactionHash;
      dispatch(
        appendBid(reduxSafeBid({ nounId, sender, value, extended, transactionHash, timestamp })),
      );
    };
    const processAuctionCreated = (
      nounId: BigNumberish,
      startTime: BigNumberish,
      endTime: BigNumberish,
    ) => {
      dispatch(
        setActiveAuction(reduxSafeNewAuction({ nounId, startTime, endTime, settled: false })),
      );
      const nounIdNumber = BigNumber.from(nounId).toNumber();
      dispatch(setLastAuctionNounId(nounIdNumber));
      dispatch(setOnDisplayAuctionNounId(nounIdNumber));
      dispatch(push(nounPath(nounIdNumber)));
    };
    const processAuctionExtended = (nounId: BigNumberish, endTime: BigNumberish) => {
      dispatch(setAuctionExtended({ nounId, endTime }));
    };
    const processAuctionSettled = (nounId: BigNumberish, winner: string, amount: BigNumberish) => {
      dispatch(setAuctionSettled({ nounId, amount, winner }));
    };

    // Fetch the current auction
    const currentAuction: IAuction = await auctionContract.auction();
    dispatch(setFullAuction(reduxSafeAuction(currentAuction)));
    dispatch(setLastAuctionNounId(currentAuction.nounId.toNumber()));

    // Fetch the previous 24hours of  bids
    const previousBids = await auctionContract.queryFilter(bidFilter, 0 - BLOCKS_PER_DAY);
    for (let event of previousBids) {
      if (event.args === undefined) return;
      //@ts-ignore
      processBidFilter(...event.args, event);
    }

    auctionContract.on(bidFilter, processBidFilter);
    auctionContract.on(createdFilter, processAuctionCreated);
    auctionContract.on(extendedFilter, processAuctionExtended);
    auctionContract.on(settledFilter, processAuctionSettled);
  };
  loadState();

  return <></>;
};

const PastAuctions: React.FC = () => {
  const [fetchAuctions, { data }] = useLazyQuery(latestAuctionsQuery(300));
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchAuctions();
    data && dispatch(addPastAuctions({ data }));
  }, [data, dispatch, fetchAuctions]);

  return <></>;
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ChainSubscriber />
      <React.StrictMode>
        <Web3ReactProvider
          getLibrary={
            (provider, connector) => new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
          }
        >
          <ApolloProvider client={client}>
            <PastAuctions />
            <DAppProvider config={useDappConfig}>
              <App />
              <Updaters />
            </DAppProvider>
          </ApolloProvider>
        </Web3ReactProvider>
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
