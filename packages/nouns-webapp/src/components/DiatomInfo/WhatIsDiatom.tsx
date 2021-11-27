import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';
import contentSea from './assets/contentSea.jpg';

import classes from './WhatIsDiatom.module.css';

const WhatIsDiatom = () => {
  const [showImg, setShowImg] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const isMobile = window.innerWidth < 900;

  const contentRef = useRef(null);
  const isContentVisible = onScreen(contentRef, { threshold: isMobile ? 1 : 0.8 });

  const imgRef = useRef(null);
  const isImgVisible = onScreen(imgRef, { threshold: 0.3 });

  useEffect(() => {
    if (isImgVisible) setShowImg(true);
    
    if (isContentVisible) setShowContent(true);
  }, [isImgVisible, isContentVisible]);

  return (
    <div id="diatom" className={`${classes.container} ${showContent ? classes.contentFadeIn : ''}`}>
      <h2>What is Diatom</h2>
      <div className={classes.contentWrapper}>
        <div ref={contentRef} className={classes.content}>
          <h2>What is Diatom</h2>
          <h3>A DAO investing in Earth's most valuable asset</h3>
          <p>
            Diatom is a decentralized currency that grows more valuable as our ocean is measurably
            restored and protected. Members of the DAO vote on projects that restore ocean health
            and expand our buying power to do so.
          </p>
        </div>
        <img ref={imgRef} className={`${classes.contentImg} ${showImg ? classes.slideIn : ''}`} src={contentSea} alt="Diatom sea" />
      </div>
    </div>
  );
};

export default WhatIsDiatom;
