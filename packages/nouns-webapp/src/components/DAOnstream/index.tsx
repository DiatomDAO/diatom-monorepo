import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';

import classes from './DAOnstream.module.css';

const DAOnstream = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const isMobile = window.innerWidth < 900;

  const ref = useRef(null);
  const isVisible = onScreen(ref, { threshold: isMobile ? 0.3 : 1 });

  useEffect(() => {
    if (isVisible) setShowAnimation(true);
  }, [isVisible]);

  return (
    <div className={classes.DAOnstream}>
      <h2>What's DAOnstream</h2>
      <div
        ref={ref}
        className={`${classes.timelineContainer} ${showAnimation ? classes.timelineAnimation : ''}`}
      >
        <div className={classes.quarter}>
          <div>
            <p>NFT Sale</p>
            <p>Token Sale</p>
            <p>Bonding &amp; Staking Launch</p>
          </div>
          <div>
            <h3>Q4</h3>
            <h2>2022</h2>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <h3>Q1</h3>
            <h2>2022</h2>
          </div>
          <div>
            <p>PRC Token Launch</p>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <p>NFT Sale</p>
            <p>Token Sale</p>
            <p>Bonding &amp; Staking Launch</p>
          </div>
          <div>
            <h3>Q2</h3>
            <h2>2022</h2>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <h3>Q3</h3>
            <h2>2022</h2>
          </div>
          <div>
            <p>NFT Sale</p>
            <p>Token Sale</p>
            <p>Bonding &amp; Staking Launch</p>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <p>NFT Sale</p>
            <p>Token Sale</p>
            <p>Bonding &amp; Staking Launch</p>
          </div>
          <div>
            <h3>Q4</h3>
            <h2>2022</h2>
          </div>
        </div>
        <div className={classes.quarter}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DAOnstream;
