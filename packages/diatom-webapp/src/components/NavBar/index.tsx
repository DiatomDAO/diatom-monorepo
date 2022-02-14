// import { useAppSelector } from '../../hooks';
// import ShortAddress from '../ShortAddress';
// import logo from '../../assets/logo.svg';
// import { useState } from 'react';
// import { useEtherBalance, useEthers } from '@usedapp/core';
// import { useEthers } from '@usedapp/core';
// import WalletConnectModal from '../WalletConnectModal';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
//import testnetWhalez from '../../assets/testnet-whalez.png';
// import clsx from 'clsx';
// import config, { CHAIN_ID } from '../../config';
import { CHAIN_ID } from '../../config';
// import { utils } from 'ethers';
// import { buildEtherscanAddressLink } from '../../utils/etherscan';
// import { ExternalURL, externalURL } from '../../utils/externalURL';
import { externalURL, ExternalURL } from '../../utils/externalURL';

import classes from './NavBar.module.css';

const NavBar = () => {
  // const activeAccount = useAppSelector(state => state.account.activeAccount);
  // const { deactivate } = useEthers();

  const twitterURL = externalURL(ExternalURL.twitter);
  const discordURL = externalURL(ExternalURL.discord);
  const mediumURL = externalURL(ExternalURL.medium);

  const launchDate = 1644868800
  let now = Math.floor(Date.now() / 1000)
  const launched = now >= launchDate

  // const stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);
  // const history = useHistory();
  // const treasuryBalance = useEtherBalance(config.addresses.whalezsDaoExecutor);
  // const daoEtherscanLink = buildEtherscanAddressLink(config.addresses.whalezsDaoExecutor);

  // const [, setShowConnectModal] = useState(false);

  // const showModalHandler = () => {
  //   setShowConnectModal(true);
  // };
  // const hideModalHandler = () => {
  //   setShowConnectModal(false);
  // };

  // const connectedContent = (
  //   <>
  //     <Nav.Item>
  //       <Nav.Link className={clsx(classes.whalezsNavLink, classes.addressNavLink)} disabled>
  //         <span className={classes.greenStatusCircle} />
  //         <span>{activeAccount && <ShortAddress address={activeAccount} avatar={true} />}</span>
  //       </Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link
  //         className={clsx(classes.whalezsNavLink, classes.disconnectBtn)}
  //         onClick={() => {
  //           setShowConnectModal(false);
  //           deactivate();
  //           setShowConnectModal(false);
  //         }}
  //       >
  //         Disconnect
  //       </Nav.Link>
  //     </Nav.Item>
  //   </>
  // );

  // const disconnectedContent = (
  //   <>
  //     <Nav.Link
  //       className={clsx(classes.whalezsNavLink, classes.connectBtn)}
  //       onClick={showModalHandler}
  //     >
  //       Connect Wallet
  //     </Nav.Link>
  //   </>
  // );

  // const useStateBg =
  //   history.location.pathname === '/' ||
  //   history.location.pathname.includes('/whalez') ||
  //   history.location.pathname.includes('/auction');

  return (
    <>
      {/* {showConnectModal && activeAccount === undefined && (
        <WalletConnectModal onDismiss={hideModalHandler} />
      )} */}
      <Navbar className={classes.mainNav} expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className={classes.navBarBrand}>
            <strong>Diatom</strong> DAO
          </Navbar.Brand>
          {Number(CHAIN_ID) !== 1 && (
            <Nav.Item>
              TESTNET
            </Nav.Item>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {launched ? (
              <>
                <Nav.Link href="https://app.diatom.fund/" className={classes.whalezsNavLink}>
                  Dashboard
                </Nav.Link>
                <Nav.Link href="https://app.diatom.fund/#/bond" className={classes.whalezsNavLink}>
                  Buy $DIAT
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/#investments" className={classes.whalezsNavLink}>
                Investment Thesis
              </Nav.Link>
            )}
            <Nav.Link href="/auction" className={classes.whalezsNavLink}>
              Whalez NFT
            </Nav.Link>
            {/*}
            <Nav.Link href="/auction" className={classes.whalezsNavLink}>
              Docs
            </Nav.Link>
            <Nav.Link href="/auction" className={classes.whalezsNavLink}>
              Contact
            </Nav.Link>
            */}
            <Nav.Link href={mediumURL} target="_blank" className={classes.whalezsNavLink}>
              Medium
            </Nav.Link>
            <Nav.Link href={discordURL} target="_blank" className={classes.whalezsNavLink}>
              <svg
                fill="currentColor"
                className={classes.linkIcon}
                aria-hidden="true"
                viewBox="0 0 24 24"
                role="img"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </Nav.Link>
            <Nav.Link href={twitterURL} target="_blank" className={classes.whalezsNavLink}>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={classes.linkIcon}
                data-v-6cab4e66=""
              >
                <path
                  d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  data-v-6cab4e66=""
                ></path>
              </svg>
            </Nav.Link>
            {/* {activeAccount && connectedContent} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
