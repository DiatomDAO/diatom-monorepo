import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ChainId, DAppProvider } from '@usedapp/core';
// import { Web3ReactProvider } from '@web3-react/core';
// import { Web3Provider } from '@ethersproject/providers';
import account from './state/slices/account';
import application from './state/slices/application';
import logs from './state/slices/logs';
import auction, {
  // reduxSafeAuction,
  // reduxSafeNewAuction,
  // reduxSafeBid,
  // setActiveAuction,
  // setAuctionExtended,
  // setAuctionSettled,
  setFullAuction,
  reduxSafePastAuction,
} from './state/slices/auction';
import onDisplayAuction, {
  setLastAuctionWhalezId,
  setOnDisplayAuctionWhalezId,
} from './state/slices/onDisplayAuction';
import { ApolloProvider, useQuery } from '@apollo/client';
import { clientFactory, latestAuctionsQuery } from './wrappers/subgraph';
import { useEffect } from 'react';
import pastAuctions, { addPastAuctions } from './state/slices/pastAuctions';
// import LogsUpdater from './state/updaters/logs';
import config from './config';
// import { WebSocketProvider } from '@ethersproject/providers';
// import { BigNumber, BigNumberish } from 'ethers';
// import { WhalezAuctionHouseFactory } from '@diatom/sdk';
import dotenv from 'dotenv';
import { useAppDispatch, useAppSelector } from './hooks';
// import { appendBid } from './state/slices/auction';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, createStore, combineReducers, PreloadedState } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { whalezPath } from './utils/history';
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

export default function configureStore(preloadedState: PreloadedState<any>) {
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

// // prettier-ignore
// const useDappConfig = {
//   readOnlyChainId: CHAIN_ID,
//   readOnlyUrls: {
//     [ChainId.Rinkeby]: createNetworkHttpUrl('rinkeby'),
//     [ChainId.Mainnet]: createNetworkHttpUrl('mainnet'),
//     [ChainId.Hardhat]: 'http://localhost:8545',
//   },
//   multicallAddresses: {
//     [ChainId.Hardhat]: config.addresses.Multicall!,
//   }
// };

const client = clientFactory(config.app.subgraphApiUri);

// const Updaters = () => {
//   return (
//     <>
//       <LogsUpdater />
//     </>
//   );
// };

// const BLOCKS_PER_DAY = 2000;

// const ChainSubscriber: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const loadState = async () => {
//     const wsProvider = new WebSocketProvider(config.app.wsRpcUri);
//     const whalezsAuctionHouseContract = WhalezAuctionHouseFactory.connect(
//       config.addresses.whalezAuctionHouseProxy,
//       wsProvider,
//     );

//     const bidFilter = whalezsAuctionHouseContract.filters.AuctionBid(null, null, null, null);
//     const extendedFilter = whalezsAuctionHouseContract.filters.AuctionExtended(null, null);
//     const createdFilter = whalezsAuctionHouseContract.filters.AuctionCreated(null, null, null);
//     const settledFilter = whalezsAuctionHouseContract.filters.AuctionSettled(null, null, null);
//     const processBidFilter = async (
//       whaleId: BigNumberish,
//       sender: string,
//       value: BigNumberish,
//       extended: boolean,
//       event: any,
//     ) => {
//       const timestamp = (await event.getBlock()).timestamp;
//       const transactionHash = event.transactionHash;
//       dispatch(
//         appendBid(reduxSafeBid({ whaleId, sender, value, extended, transactionHash, timestamp })),
//       );
//     };
//     const processAuctionCreated = (
//       whaleId: BigNumberish,
//       startTime: BigNumberish,
//       endTime: BigNumberish,
//     ) => {
//       dispatch(
//         setActiveAuction(reduxSafeNewAuction({ whaleId, startTime, endTime, settled: false })),
//       );
//       const whaleIdNumber = BigNumber.from(whaleId).toNumber();
//       dispatch(push(whalezPath(whaleIdNumber)));
//       dispatch(setOnDisplayAuctionWhalezId(whaleIdNumber));
//       dispatch(setLastAuctionWhalezId(whaleIdNumber));
//     };
//     // Fetch the current auction
//     const currentAuction = await whalezsAuctionHouseContract.auction();
//     dispatch(setFullAuction(reduxSafeAuction(currentAuction)));
//     dispatch(setLastAuctionWhalezId(currentAuction.whaleId.toNumber()));

//     // Fetch the previous 24hours of  bids
//     const previousBids = await whalezsAuctionHouseContract.queryFilter(
//       bidFilter,
//       0 - BLOCKS_PER_DAY,
//     );
//     for (let event of previousBids) {
//       if (event.args === undefined) return;
//       processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
//     }
//   };
//   loadState();

//   return <></>;
// };

const PastAuctions: React.FC = () => {
  const latestAuctionId = 50;
  const { data } = useQuery(latestAuctionsQuery());
  const pathWhaleId = useAppSelector(state => state.router.location.pathname)
    .split('/')
    .slice(-1)[0];
  const whaleId = !pathWhaleId || isNaN(Number(pathWhaleId)) ? 1 : Number(pathWhaleId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      const currentAuctionIdx = 50 - whaleId;
      dispatch(addPastAuctions({ data }));
      dispatch(setOnDisplayAuctionWhalezId(whaleId));
      dispatch(setFullAuction(reduxSafePastAuction(data.auctions[currentAuctionIdx])));
      dispatch(setLastAuctionWhalezId(50));
      dispatch(push(whalezPath(whaleId)));
    }
  }, [data, latestAuctionId, dispatch, pathWhaleId, whaleId]);

  return <></>;
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <ChainSubscriber /> */}
      <React.StrictMode>
        {/* <Web3ReactProvider
          getLibrary={
            provider => new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
          }
        > */}
        <ApolloProvider client={client}>
          <PastAuctions />
          {/* <DAppProvider config={useDappConfig}> */}
          <App />
          {/* <Updaters /> */}
          {/* </DAppProvider> */}
        </ApolloProvider>
        {/* </Web3ReactProvider> */}
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
