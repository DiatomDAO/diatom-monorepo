import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';

import diatom from './assets/diatom.png';
import classes from './Lungs.module.css';
import coin from './assets/coin.png';
import communityImg from './assets/community.svg';
import protocolImg from './assets/protocol.png';
import rightArrow from './assets/rightArrow.svg';

const Lungs = () => {
  const [showTopicOne, setShowTopicOne] = useState(false);
  const [showTopicTwo, setShowTopicTwo] = useState(false);
  const [showTopicThree, setShowTopicThree] = useState(false);

  const isMobile = window.innerWidth < 900;

  const topicOneRef = useRef(null);
  const isTopicOneVisible = onScreen(topicOneRef, {
    threshold: isMobile ? 1 : 0.5,
    rootMargin: isMobile ? '0px' : '-130px',
  });

  const topicTwoRef = useRef(null);
  const isTopicTwoVisible = onScreen(topicTwoRef, {
    threshold: isMobile ? 1 : 0.5,
    rootMargin: isMobile ? '0px' : '-130px',
  });

  const topicThreeRef = useRef(null);
  const isTopicThreeVisible = onScreen(topicThreeRef, {
    threshold: isMobile ? 1 : 0.5,
    rootMargin: isMobile ? '0px' : '-130px',
  });

  useEffect(() => {
    if (isTopicOneVisible) setShowTopicOne(true);
    if (isTopicTwoVisible) setShowTopicTwo(true);
    if (isTopicThreeVisible) setShowTopicThree(true);
  }, [isTopicOneVisible, isTopicTwoVisible, isTopicThreeVisible]);

  return (
    <>
      <div className={classes.LungsContainer}>
        <div className={classes.LungsContentWrapper}>
          <img className={classes.diatomImg} src={diatom} alt="Diatom" />
          <div className={classes.LungsContent}>
            <h2>Meet the real lungs of the planet</h2>
            <p>
              Diatoms are algae in oceans, lakes and waterways that are responsible for sequestering
              carbon and provide 50% of all the air that we breathe on earth.
            </p>
            <a
              href="https://medium.com/@diatomdao/introducing-diatom-dao-c9f7dd17b34c"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
              <img src={rightArrow} alt="Right arrow" />
            </a>
          </div>
        </div>
      </div>
      <div className={classes.topics}>
        <div
          ref={topicOneRef}
          className={`${classes.topic} ${showTopicOne ? classes.fadeIn : ''}`}
        >
          <img style={{ maxWidth: '130px' }} src={coin} alt="Asset-backed icon" />
          <h5>Asset-backed</h5>
          <p>
            Each DIAT is backed by a minimum of 1 DAI. This means no matter what happens, you will
            always be able to sell your DIAT for at least 1 DAI. As our treasury grows, this number
            will also increase.
          </p>
        </div>
        <div
          ref={topicTwoRef}
          className={`${classes.topic} ${showTopicTwo ? classes.fadeIn : ''}`}
        >
          <img style={{ maxWidth: '156px' }} src={protocolImg} alt="Protocol Controlled icon" />
          <h5>Protocol Controlled</h5>
          <p>
            Unlike most other protocols, Diatom will own the majority of its LP’s by selling bonds
            of discounted DIAT in exchange for LP tokens. This prevents reliance on mercenary
            liquidity providers, and allows the treasury to be continually bolstered by LP fees.
          </p>
        </div>
        <div
          ref={topicThreeRef}
          className={`${classes.topic} ${showTopicThree ? classes.fadeIn : ''}`}
        >
          <img src={communityImg} alt="Community Governed icon" />
          <h5>Community Governed</h5>
          <p>
            As a DAO, Diatom is owned and directed pro-rata by DIAT holders. Any action or change to
            the DAO is discussed and voted upon by token holders. This ensures the DAO’s actions
            benefit all, and not just one small party.
          </p>
        </div>
      </div>
    </>
  );
};

export default Lungs;
