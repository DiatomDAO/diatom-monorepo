import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';
import logo from './assets/diatomLogo.svg';
import bonding from './assets/bonding.svg';
import removal from './assets/removal.svg';
import verified from './assets/verified.svg';
import plastic from './assets/plastic.png';

import classes from './Tokenomics.module.css';

const Tokenomics = () => {
  const [currentSectionVisible, setCurrentSectionVisible] = useState(0);

  const isMobile = window.innerWidth < 900;

  const sectionOneRef = useRef(null);
  const isSectionOneVisible = onScreen(sectionOneRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionTwoRef = useRef(null);
  const isSectionTwoVisible = onScreen(sectionTwoRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionThreeRef = useRef(null);
  const isSectionThreeVisible = onScreen(sectionThreeRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionFourRef = useRef(null);
  const isSectionFourVisible = onScreen(sectionFourRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionFiveRef = useRef(null);
  const isSectionFiveVisible = onScreen(sectionFiveRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  useEffect(() => {
    if (isSectionOneVisible && currentSectionVisible < 1) setCurrentSectionVisible(1);
    if (isSectionTwoVisible && currentSectionVisible < 2) setCurrentSectionVisible(2);
    if (isSectionThreeVisible && currentSectionVisible < 3) setCurrentSectionVisible(3);
    if (isSectionFourVisible && currentSectionVisible < 4) setCurrentSectionVisible(4);
    if (isSectionFiveVisible && currentSectionVisible < 5) setCurrentSectionVisible(5);
  }, [
    isSectionOneVisible,
    isSectionTwoVisible,
    isSectionThreeVisible,
    isSectionFourVisible,
    isSectionFiveVisible,
    currentSectionVisible,
  ]);

  return (
    <div
      id="Tokenomics"
      className={`${classes.section} ${currentSectionVisible >= 1 ? classes.contentFadeIn : ''}`}
    >
      <h1>Tokenomics</h1>
      <img className={classes.centralImg} src={logo} alt="" />
      <div
        ref={sectionOneRef}
        className={`${classes.sectionOne} ${
          currentSectionVisible >= 1 && isMobile ? classes.contentFadeIn : ''
        }`}
      >
        <div className={classes.exchangeImages}>
          <img src={bonding} alt="Bonding" />
          <div className={classes.exchangeCoins}>
            <div>
              <div className={classes.wind} />
              <div className={classes.yellowBall} />
              {/* <img src={logo} alt="Bonding" /> */}
            </div>
            <div>
              <img src={logo} alt="Bonding" />
              <div className={classes.wind} />
            </div>
          </div>
          <img src={logo} alt="Bonding" />
        </div>
        <h2>01 Bonding</h2>
        <p>
          Members of the DAO buy DIAT at a discount in exchange for tokens that build the treasury.
        </p>
      </div>
      <div
        ref={sectionTwoRef}
        className={`${classes.sectionTwo} ${
          currentSectionVisible >= 2 && isMobile ? classes.contentFadeIn : ''
        }`}
      >
        <img src={removal} alt="" />
        <h2>02 Removal Projects Funded</h2>
        <p>We distribute funds to PRC-compliant projects.</p>
      </div>
      <div
        ref={sectionThreeRef}
        className={`${classes.sectionThree} ${
          currentSectionVisible >= 3 && isMobile ? classes.contentFadeIn : ''
        }`}
      >
        <img src={verified} alt="" />
        <h2>03 Plastic Removal Verified</h2>
        <p>The plastic is removed, weighed, and transparently processed.</p>
      </div>
      <div
        ref={sectionFourRef}
        className={`${classes.sectionFour} ${
          currentSectionVisible >= 4 && isMobile ? classes.contentFadeIn : ''
        }`}
      >
        <img src={plastic} alt="" />
        <h2>04 PRC Minted</h2>
        <p>
          Depending on the value of the plastic removed, a number of PRC's are minted and put into
          our treasury as assets.
        </p>
      </div>
      <div
        ref={sectionFiveRef}
        className={`${classes.sectionFive} ${
          currentSectionVisible >= 5 && isMobile ? classes.contentFadeIn : ''
        }`}
      >
        <img src={logo} alt="" />
        <h2>05 PRC Purchases</h2>
        <p>
          Corporations and individuals buy PRC's and "retire" them to provably remove past plastic
          pollution.
        </p>
      </div>
    </div>
  );
};

export default Tokenomics;
