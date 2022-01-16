import { useAppSelector } from '../../hooks';
import ShortAddress from '../ShortAddress';
import classes from './NavBar.module.css';
// import logo from '../../assets/logo.svg';
import { useState } from 'react';
// import { useEtherBalance, useEthers } from '@usedapp/core';
import { useEthers } from '@usedapp/core';
// import WalletConnectModal from '../WalletConnectModal';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
//import testnetWhalez from '../../assets/testnet-whalez.png';
import clsx from 'clsx';
// import config, { CHAIN_ID } from '../../config';
import { CHAIN_ID } from '../../config';
// import { utils } from 'ethers';
// import { buildEtherscanAddressLink } from '../../utils/etherscan';
// import { ExternalURL, externalURL } from '../../utils/externalURL';
import { externalURL, ExternalURL } from '../../utils/externalURL';

const NavBar = () => {
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const { deactivate } = useEthers();

  const twitterURL = externalURL(ExternalURL.twitter);
  const discordURL = externalURL(ExternalURL.discord);
  const mediumURL = externalURL(ExternalURL.medium);

  // const stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);
  // const history = useHistory();
  // const treasuryBalance = useEtherBalance(config.addresses.whalezsDaoExecutor);
  // const daoEtherscanLink = buildEtherscanAddressLink(config.addresses.whalezsDaoExecutor);

  const [, setShowConnectModal] = useState(false);

  // const showModalHandler = () => {
  //   setShowConnectModal(true);
  // };
  // const hideModalHandler = () => {
  //   setShowConnectModal(false);
  // };

  const connectedContent = (
    <>
      <Nav.Item>
        <Nav.Link className={clsx(classes.whalezsNavLink, classes.addressNavLink)} disabled>
          <span className={classes.greenStatusCircle} />
          <span>{activeAccount && <ShortAddress address={activeAccount} avatar={true} />}</span>
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
        <Container className={classes.navalert}>
          Our <a target="_blank" rel="noreferrer" href="https://presale.diatom.fund">Pre-Sale Batch Auction</a> begins Jan 17th
        </Container>
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
            <Nav.Link target="_blank" href="https://presale.diatom.fund" className={classes.whalezsNavLink}>
              Pre-Sale
            </Nav.Link>
            <Nav.Link href="/auction" className={classes.whalezsNavLink}>
              Whalez NFT
            </Nav.Link>
            <Nav.Link href={discordURL} target="_blank" className={classes.whalezsNavLink}>
              Discord
            </Nav.Link>
            <Nav.Link href={twitterURL} target="_blank" className={classes.whalezsNavLink}>
              Twitter
            </Nav.Link>
            <Nav.Link href={mediumURL} target="_blank" className={classes.whalezsNavLink}>
              Medium
            </Nav.Link>
            {activeAccount && connectedContent}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
