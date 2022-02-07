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
    <div id="works" className={classes.infoSections}>
      <h1>Investments</h1>
      <div
        ref={sectionOneRef}
        className={`${classes.sectionLeft} ${showSectionOne ? classes.fadeIn : ''}`}
      >
        <div>
          <div className={classes.sectionTitle}>
            <p>01</p>
            <h2>PRC &amp; Ocean Assets</h2>
          </div>
          <p>
            Diatom is both establishing and expanding on existing asset classes that protect the
            ocean, tapping into a $24 Trillion ocean economy, while generating healthy returns for
            investors. Our first primary asset is Plastic Removal Credits (PRC), unlocking financial
            incentives that clean our ocean, rather than extract from it.
          </p>
        </div>
        <div>
          <img className={classes.tresuasuryMobileMargin} src={treasure} alt="treasure DIAT" />
        </div>
      </div>
      <div
        ref={sectionTwoRef}
        className={`${classes.sectionRight} ${showSectionTwo ? classes.fadeIn : ''}`}
      >
        <div>
          <img className={classes.coinsStack} src={coinsStack} alt="DIAT backed" />
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
            <h2>Ocean Solutions Company Portfolio</h2>
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
