import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';
import network from './assets/network.jpg';

import classes from './HowItWorks.module.css';

const HowItWorks = () => {
  const [showImg, setShowImg] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const isMobile = window.innerWidth < 900;

  const contentRef = useRef(null);
  const isContentVisible = onScreen(contentRef, { threshold: isMobile ? 1 : 0.8 });

  const imgRef = useRef(null);
  const isImgVisible = onScreen(imgRef, { threshold: 0.7 });

  useEffect(() => {
    if (isImgVisible) setShowImg(true);
    
    if (isContentVisible) setShowContent(true);
  }, [isImgVisible, isContentVisible]);;

  return (
    <div id="works" className={`${classes.container} ${showContent ? classes.contentFadeIn : ''}`}>
      <h2>How it works</h2>
      <div className={classes.contentWrapper}>
        <img ref={imgRef} className={`${classes.contentImg} ${showImg ? classes.slideIn : ''}`} src={network} alt="Diatom sea" />
        <div ref={contentRef} className={classes.content}>
          <h2>How it works</h2>
          <h3>The power of DeFi in a community-governed DAO</h3>
          <p>
            As a DAO, Diatom is owned and directed pro-rata by DIAT holders. Any action or change to
            the DAO is discussed and voted upon by token holders. This ensures the DAO’s actions
            benefit all, and not just one small party.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
