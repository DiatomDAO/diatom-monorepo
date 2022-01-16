import { useEffect } from 'react';
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
import NotFoundPage from './pages/NotFound';
// import { CHAIN_ID } from './config';
import DaoPage from './pages/Dao';

import ReactGA from "react-ga4";

ReactGA.initialize("G-VTWKXDV0Y9");
ReactGA.send("pageview");

function App() {
  const { account } = useEthers();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Local account array updated
    dispatch(setActiveAccount(account));
  }, [account, dispatch]);

  // const alertModal = useAppSelector(state => state.application.alertModal);

  return (
    <div className={`${classes.wrapper}`}>
      {/* {Number(CHAIN_ID) !== chainId && <NetworkAlert />}
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )} */}
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={DaoPage} />
          <Route
            exact
            path="/auction/:id"
            render={props => <AuctionPage initialAuctionId={Number(props.match.params.id)} />}
          />
          <Route exact path="/auction" component={AuctionPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
