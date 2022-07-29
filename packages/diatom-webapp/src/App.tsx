import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { useAppDispatch } from './hooks';
import { setActiveAccount } from './state/slices/account';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { setAlertModal } from './state/slices/application';
import classes from './App.module.css';
import '../src/css/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AlertModal from './components/Modal';
import NavBar from './components/NavBar';
// import NetworkAlert from './components/NetworkAlert';
import Footer from './components/Footer';
import AuctionPage from './pages/Auction';
// import NotFoundPage from './pages/NotFound';
// import { CHAIN_ID } from './config';
import DaoPage from './pages/Dao';

import ReactGA from 'react-ga4';

ReactGA.initialize('G-VTWKXDV0Y9');
ReactGA.send('pageview');

function App() {
  const { account } = useEthers();
  const dispatch = useAppDispatch();

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('archive') || path.includes('auction')) {
      setShouldLoad(true);
    }
  }, []);

  useEffect(() => {
    // Local account array updated
    dispatch(setActiveAccount(account));
  }, [account, dispatch]);

  // const alertModal = useAppSelector(state => state.application.alertModal);

  return (
    <div className={`${shouldLoad ? classes.wrapper : ''}`}>
      {/* {Number(CHAIN_ID) !== chainId && <NetworkAlert />}
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )} */}
      <BrowserRouter>
        {shouldLoad && <NavBar />}
        <Switch>
          <Route exact path="/archive/" component={DaoPage} />
          <Route
            exact
            path="/auction/:id"
            render={props => <AuctionPage initialAuctionId={Number(props.match.params.id)} />}
          />
          <Route exact path="/archive/auction" component={AuctionPage} />
          <Route
            exact
            path="/archive/music"
            component={() => {
              window.location.replace('https://skiomusic.com/contest/diatom-dao-remix-contest');
              return null;
            }}
          />
          {/* <Route
            component={() => {
              window.location.href = 'https://refunds.diatom.fund/';
              return null;
            }}
          /> */}
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
        {shouldLoad && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
