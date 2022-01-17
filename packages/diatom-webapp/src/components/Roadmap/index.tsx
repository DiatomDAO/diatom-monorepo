import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';

import classes from './Roadmap.module.css';

const Roadmap = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const isMobile = window.innerWidth < 900;

  const ref = useRef(null);
  const isVisible = onScreen(ref, { threshold: isMobile ? 0.3 : 1 });

  useEffect(() => {
    if (isVisible) setShowAnimation(true);
  }, [isVisible]);

  return (
    <div className={classes.DAOnstream}>
      <div className={classes.titleWrapper}>
        <h1>The Roadmap</h1>
      </div>
      <div
        ref={ref}
        className={`${classes.timelineContainer} ${showAnimation ? classes.timelineAnimation : ''}`}
      >
        <div className={classes.quarter}>
          <div>
            <p>Whalez NFT Sale</p>
            <p>Whitelist Sale</p>
          </div>
          <div>
            <h3>Q4</h3>
            <h2>2021</h2>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <h3>Q1</h3>
            <h2>2022</h2>
          </div>
          <div>
            <p>Public Token Sale</p>
            <p>Bonding &amp; Staking Launch</p>
            <p>PRC Bridge Launch</p>
            <p>First PRC Minting</p>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <p>Codename: Ocean Game</p>
            <p>PRC Partner Expansion</p>
            <p>SMRF's Rollout</p>
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
            <p>Corporate Partnerships</p>
            <p>New Asset Class Dev</p>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <p>New Asset Launch</p>
            <p>Diatom NFT Series</p>
          </div>
          <div>
            <h3>Beyond</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
