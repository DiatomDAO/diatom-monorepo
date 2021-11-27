import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';
import ghostnet from './assets/ghostnet.jpg';

import classes from './PlasticCredits.module.css';

const PlasticCredits = () => {
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
  }, [isImgVisible, isContentVisible]);

  return (
    <div className={`${classes.container} ${showContent ? classes.contentFadeIn : ''}`}>
      <h2>Plastic Reduction Credits</h2>
      <div className={classes.contentWrapper}>
        <img
          ref={imgRef}
          className={`${classes.contentImg} ${showImg ? classes.slideIn : ''}`}
          src={ghostnet}
          alt="Diatom sea"
        />
        <div ref={contentRef} className={classes.content}>
          <h2>Plastic Reduction Credits</h2>
          <h3>Verified plastic removal</h3>
          <p>
            We're launching the first ever tokenized plastic credit. Plastic Removal Credits (PRC)
            are tokenized representations of plastic removed frrom key ecosystems that threaten
            overall ocean health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlasticCredits;
