import { useAppSelector } from '../../hooks';
import ShortAddress from '../ShortAddress';
import classes from './NavBar.module.css';
// import logo from '../../assets/logo.svg';
import { useState } from 'react';
// import { useEtherBalance, useEthers } from '@usedapp/core';
import { useEthers } from '@usedapp/core';
import WalletConnectModal from '../WalletConnectModal';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import testnetWhalez from '../../assets/testnet-whalez.png';
import clsx from 'clsx';
// import config, { CHAIN_ID } from '../../config';
import { CHAIN_ID } from '../../config';
// import { utils } from 'ethers';
// import { buildEtherscanAddressLink } from '../../utils/etherscan';
// import { ExternalURL, externalURL } from '../../utils/externalURL';

const NavBar = () => {
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const { deactivate } = useEthers();

  // const stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);
  // const history = useHistory();
  // const treasuryBalance = useEtherBalance(config.addresses.whalezsDaoExecutor);
  // const daoEtherscanLink = buildEtherscanAddressLink(config.addresses.whalezsDaoExecutor);

  const [showConnectModal, setShowConnectModal] = useState(false);

  const showModalHandler = () => {
    setShowConnectModal(true);
  };
  const hideModalHandler = () => {
    setShowConnectModal(false);
  };

  const connectedContent = (
    <>
      <Nav.Item>
        <Nav.Link className={clsx(classes.whalezsNavLink, classes.addressNavLink)} disabled>
          <span className={classes.greenStatusCircle} />
          <span>{activeAccount && <ShortAddress address={activeAccount} />}</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={clsx(classes.whalezsNavLink, classes.disconnectBtn)}
          onClick={() => {
            setShowConnectModal(false);
            deactivate();
            setShowConnectModal(false);
          }}
        >
          Disconnect
        </Nav.Link>
      </Nav.Item>
    </>
  );

  const disconnectedContent = (
    <>
      <Nav.Link
        className={clsx(classes.whalezsNavLink, classes.connectBtn)}
        onClick={showModalHandler}
      >
        Connect Wallet
      </Nav.Link>
    </>
  );

  // const useStateBg =
  //   history.location.pathname === '/' ||
  //   history.location.pathname.includes('/whalez') ||
  //   history.location.pathname.includes('/auction');

  return (
    <>
      {showConnectModal && activeAccount === undefined && (
        <WalletConnectModal onDismiss={hideModalHandler} />
      )}
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className={classes.navBarBrand}>
            <strong>Diatom</strong> DAO
          </Navbar.Brand>
          {Number(CHAIN_ID) !== 1 && (
            <Nav.Item>
              <img className={classes.testnetImg} src={testnetWhalez} alt="testnet whalez" />
              TESTNET
            </Nav.Item>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {/* <Nav.Item>
              {treasuryBalance && (
                <Nav.Link
                  href={daoEtherscanLink}
                  className={classes.whalezsNavLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  TREASURY Ξ {Number(utils.formatEther(treasuryBalance)).toFixed(0)}
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Link as={Link} to="/vote" className={classes.whalezsNavLink}>
              DAO
            </Nav.Link>
            <Nav.Link
              href={externalURL(ExternalURL.notion)}
              className={classes.whalezsNavLink}
              target="_blank"
              rel="noreferrer"
            >
              DOCS
            </Nav.Link>
            <Nav.Link href="/playground" className={classes.whalezsNavLink}>
              PLAYGROUND
            </Nav.Link> */}
            <Nav.Link href="#diatom" className={classes.whalezsNavLink}>
              What is Diatom
            </Nav.Link>
            <Nav.Link href="#works" className={classes.whalezsNavLink}>
              How it Works
            </Nav.Link>
            <Nav.Link href="#join" className={classes.whalezsNavLink}>
              How to Join
            </Nav.Link>
            <Nav.Link href="#community" className={classes.whalezsNavLink}>
              Join the Community
            </Nav.Link>
            {activeAccount ? connectedContent : disconnectedContent}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
