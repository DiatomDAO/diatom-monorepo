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
        <div
          className={`${classes.roadmapColumn} ${classes.roadmapWavesColumn}`}
          onClick={() => setShowAnimation(!showAnimation)}
        >
          <div className={classes.quarter}>
            {/* <img
              className={classes.roadmapLine}
              src={isMobile ? horizontalRoadmapLine : verticalRoadmapLine}
              alt="Roadmap line"
            /> */}
            <svg
              className={classes.mobileRoadmapLine}
              width="124"
              height="5"
              viewBox="0 0 124 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 2.50098L123.91 2.50098"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
            <svg
              className={classes.desktopRoadmapLine}
              width="5"
              height="125"
              viewBox="0 0 5 125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2.20508 0.795898L2.20508 124.206"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
          <div className={classes.quarter}>
            <svg
              className={classes.mobileRoadmapLine}
              width="124"
              height="5"
              viewBox="0 0 124 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 2.50098L123.91 2.50098"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
            <svg
              className={classes.desktopRoadmapLine}
              width="5"
              height="125"
              viewBox="0 0 5 125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2.20508 0.795898L2.20508 124.206"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
          <div className={classes.quarter}>
            <svg
              className={classes.mobileRoadmapLine}
              width="124"
              height="5"
              viewBox="0 0 124 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 2.50098L123.91 2.50098"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
            <svg
              className={classes.desktopRoadmapLine}
              width="5"
              height="125"
              viewBox="0 0 5 125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2.20508 0.795898L2.20508 124.206"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
          <div className={classes.quarter}>
            <svg
              className={classes.mobileRoadmapLine}
              width="124"
              height="5"
              viewBox="0 0 124 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                id="line"
                d="M0.5 2.50098L123.91 2.50098"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
            <svg
              className={classes.desktopRoadmapLine}
              width="5"
              height="125"
              viewBox="0 0 5 125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2.20508 0.795898L2.20508 124.206"
                stroke="#489FA6"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
          <svg
            className={classes.mobileRoadmapWaves}
            width="114"
            height="1585"
            viewBox="0 0 114 1585"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M97.585 0.254883C97.585 66.2549 16.415 66.2549 16.415 132.255C16.415 198.255 97.585 198.255 97.585 264.255C97.585 330.255 16.415 330.255 16.415 396.255C16.415 462.255 97.585 462.255 97.585 528.255C97.585 594.255 16.415 594.255 16.415 660.255C16.415 726.255 97.585 726.255 97.585 792.255C97.585 858.255 16.415 858.255 16.415 924.255C16.415 990.255 97.585 990.255 97.585 1056.25C97.585 1122.25 16.415 1122.25 16.415 1188.25C16.415 1254.25 97.585 1254.25 97.585 1320.25C97.585 1386.25 16.415 1386.25 16.415 1452.25C16.415 1518.25 97.585 1518.25 97.585 1584.25"
              stroke="#053039"
              strokeWidth="32"
              strokeMiterlimit="10"
            />
          </svg>
          <svg
            className={classes.desktopRoadmapWaves}
            width="1584"
            height="114"
            viewBox="0 0 1584 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16.6699C66 16.6699 66 97.8399 132 97.8399C198 97.8399 198 16.6699 264 16.6699C330 16.6699 330 97.8399 396 97.8399C462 97.8399 462 16.6699 528 16.6699C594 16.6699 594 97.8399 660 97.8399C726 97.8399 726 16.6699 792 16.6699C858 16.6699 858 97.8399 924 97.8399C990 97.8399 990 16.6699 1056 16.6699C1122 16.6699 1122 97.8399 1188 97.8399C1254 97.8399 1254 16.6699 1320 16.6699C1386 16.6699 1386 97.8399 1452 97.8399C1518 97.8399 1518 16.6699 1584 16.6699"
              stroke="#053039"
              strokeWidth="32"
              strokeMiterlimit="10"
            />
          </svg>
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
