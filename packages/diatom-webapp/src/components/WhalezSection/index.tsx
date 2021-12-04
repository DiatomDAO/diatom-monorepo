import rightArrow from '../../assets/rightArrow.svg';
import whaleLeft from './assets/whaleLeft.jpg';
import whaleCenter from './assets/whaleCenter.jpg';
import whaleRight from './assets/whaleRight.jpg';

import classes from './WhalezSection.module.css';

const WhalezSection = () => (
  <div className={classes.whalezContainer}>
    <div className={classes.contentWrapper}>
      <h2>50 Whalez to jumpstart a plastic-free ocean.</h2>
      <p>
        Diatom leverages the power of staking and bonding pioneered by OlympusDAO to fund
        highly-vetted ocean protection projects, including the first ever tokenization of ocean
        Plastic Removal Credits (PRC).
      </p>
      <p>
        Whalez is a limited collection of NFTs that fund real-world ocean plastic removal. Each
        Whale funds minting the first PRC's, and provides buyers with $DIAT (the Diatom DAO token)
        at a pre-sale price of $25, with up an additional 2X bonus.
      </p>
      <p>Whalez auctions will run from December 1st to December 14th.</p>
      <a
        href="https://medium.com/@diatomdao/introducing-diatom-dao-c9f7dd17b34c"
        target="_blank"
        rel="noreferrer"
      >
        Read the PRC white paper here
        <img src={rightArrow} alt="Right arrow" />
      </a>
    </div>
    <div className={classes.imgWrapper}>
      <img className={classes.whaleLeft} src={whaleLeft} alt="Right arrow" />
      <img className={classes.whaleCenter} src={whaleCenter} alt="Right arrow" />
      <img className={classes.whaleRight} src={whaleRight} alt="Right arrow" />
    </div>
  </div>
);

export default WhalezSection;
