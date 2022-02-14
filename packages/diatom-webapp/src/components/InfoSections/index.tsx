import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';

import treasure from './assets/treasure.png';
import coinsStack from './assets/coinsStack.png';
import staking from './assets/staking.png';
import whales from './assets/whales.svg';

import classes from './InfoSections.module.css';

const InfoSections = () => {
  const [showSectionOne, setShowSectionOne] = useState(false);
  const [showSectionTwo, setShowSectionTwo] = useState(false);
  const [showSectionThree, setShowSectionThree] = useState(false);
  const [showSectionFour, setShowSectionFour] = useState(false);

  const isMobile = window.innerWidth < 900;

  const sectionOneRef = useRef(null);
  const isSectionOneVisible = onScreen(sectionOneRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  const sectionTwoRef = useRef(null);
  const isSectionTwoVisible = onScreen(sectionTwoRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  const sectionThreeRef = useRef(null);
  const isSectionThreeVisible = onScreen(sectionThreeRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  const sectionFourRef = useRef(null);
  const isSectionFourVisible = onScreen(sectionFourRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  useEffect(() => {
    if (isSectionOneVisible) setShowSectionOne(true);
    if (isSectionTwoVisible) setShowSectionTwo(true);
    if (isSectionThreeVisible) setShowSectionThree(true);
    if (isSectionFourVisible) setShowSectionFour(true);
  }, [isSectionOneVisible, isSectionTwoVisible, isSectionThreeVisible, isSectionFourVisible]);

  return (
    <div id="investments" className={classes.infoSections}>
      <h1>Investments</h1>
      <div
        ref={sectionOneRef}
        className={`${classes.sectionLeft} ${showSectionOne ? classes.fadeIn : ''}`}
      >
        <div>
          <div className={classes.sectionTitle}>
            <p>01</p>
            <h2>Plastic Removal Credits (PRC)</h2>
          </div>
          <p>
            Diatom is building a bridge to create the first-ever Plastic Removal Credit. PRC is like Carbon Credits, but for plastic removed from the ocean. We're funding plastic cleanup to amass PRC in our treasury, and investing in the future of these credits.
          </p>
        </div>
        <div>
          <img className={classes.tresuasuryMobileMargin} src={coinsStack} alt="treasure DIAT" />
        </div>
      </div>
      <div
        ref={sectionTwoRef}
        className={`${classes.sectionRight} ${showSectionTwo ? classes.fadeIn : ''}`}
      >
        <div>
          <img className={classes.coinsStack} src={treasure} alt="DIAT backed" />
        </div>
        <div>
          <div className={classes.sectionTitle}>
            <p>02</p>
            <h2>Ocean Protection Infrastructure</h2>
          </div>
          <p>
            Diatom is investing in plastic removal infrastructure that generate PRC for the
            treasury in perpetuity, such as River Booms that catch ocean-bound plastic, Plastic
            Processing Facilities, Ocean Drones and crowdsourced solutions to ocean protection. You
            can think of these as real-world “miners” of PRC.
          </p>
        </div>
      </div>
      <div
        ref={sectionThreeRef}
        className={`${classes.sectionLeft} ${showSectionThree ? classes.fadeIn : ''}`}
      >
        <div>
          <div className={classes.sectionTitle}>
            <p>03</p>
            <h2>Off-Chain Investments</h2>
          </div>
          <p>
            Diatom will also invest in off-chain private companies whose mission is aligned with
            ocean protection, and have a clear and credible plan to generate healthy ROI in a
            reasonable time frame. These opportunity zones include marine debris/Port reception
            facilities, new material design, sustainable aquaculture, offshore renewable energy, and
            technology for ocean data collection.
          </p>
        </div>
        <div>
          <img src={staking} alt="Staking DIAT" />
        </div>
      </div>
      <div
        ref={sectionFourRef}
        className={`${classes.sectionRight} ${showSectionFour ? classes.fadeIn : ''}`}
      >
        <div>
          <img src={whales} alt="Whales protection" />
        </div>
        <div>
          <div className={classes.sectionTitle}>
            <p>04</p>
            <h2>DeFi investments</h2>
          </div>
          <p>
            As a DAO running on the blockchain, we will also invest in crypto to consistently expand
            the DAO’s buying power to invest in ocean protection initiatives, including safe and
            stable bets along with a smaller allocation of higher-risk / higher-reward projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSections;
