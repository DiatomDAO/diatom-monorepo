import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';
// import verticalRoadmapWaves from '../../assets/verticalRoadmapWaves.svg';
// import horizontalRoadmapWaves from '../../assets/horizontalRoadmapWaves.svg';
import horizontalRoadmapLine from '../../assets/horizontalRoadmapLine.svg';
import verticalRoadmapLine from '../../assets/verticalRoadmapLine.svg';

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
    <div className={classes.roadmap}>
      <div className={classes.titleWrapper}>
        <h1>The Roadmap</h1>
      </div>
      <div
        ref={ref}
        className={`${classes.roadmapContainer} ${showAnimation ? classes.roadmapAnimation : ''}`}
      >
        <div className={classes.roadmapColumn}>
          <div className={classes.quarter}>
            <h2>Q1</h2>
            <h3>2022</h3>
          </div>
          <div className={classes.quarter}>
            <h2>Q2</h2>
            <h3>2022</h3>
          </div>
          <div className={classes.quarter}>
            <h2>Q3</h2>
            <h3>2022</h3>
          </div>
          <div className={classes.quarter}>
            <h2>Q4</h2>
            <h3>2022</h3>
          </div>
        </div>
        <div className={`${classes.roadmapColumn} ${classes.roadmapWavesColumn}`}>
          <div className={classes.quarter}>
            <img
              className={classes.roadmapLine}
              src={isMobile ? horizontalRoadmapLine : verticalRoadmapLine}
              alt="Roadmap line"
            />
          </div>
          <div className={classes.quarter}>
            <img
              className={classes.roadmapLine}
              src={isMobile ? horizontalRoadmapLine : verticalRoadmapLine}
              alt="Roadmap line"
            />
          </div>
          <div className={classes.quarter}>
            <img
              className={classes.roadmapLine}
              src={isMobile ? horizontalRoadmapLine : verticalRoadmapLine}
              alt="Roadmap line"
            />
          </div>
          <div className={classes.quarter}>
            <img
              className={classes.roadmapLine}
              src={isMobile ? horizontalRoadmapLine : verticalRoadmapLine}
              alt="Roadmap line"
            />
          </div>
          <div className={classes.roadmapWaves} />
        </div>
        <div className={classes.roadmapColumn}>
          <div className={classes.quarter}>
            <p>Public Token Sale</p>
            <p>Bonding &amp; Staking Launch</p>
            <p>PRC Bridge Launch</p>
            <p>First PRC Minting</p>
          </div>
          <div className={classes.quarter}>
            <p>Codename: Ocean Game</p>
            <p>PRC Partner Expansion</p>
            <p>SMRF's Rollout</p>
          </div>
          <div className={classes.quarter}>
            <p>Corporate Partnerships</p>
            <p>New Asset Class Dev</p>
          </div>
          <div className={classes.quarter}>
            <p>New Asset Launch</p>
            <p>Diatom NFT Series</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
