import treasure from './assets/treasure.svg';
import backed from './assets/backed.svg';
import staking from './assets/staking.svg';
import whales from './assets/whales.svg';

import classes from './InfoSections.module.css';

const InfoSections = () => (
  <div className={classes.infoSections}>
    <div className={classes.sectionLeft}>
      <div>
        <div className={classes.sectionTitle}>
          <p>01</p>
          <h2>The Treasury</h2>
        </div>
        <p>
          We sell bonds of discounted DIAT for ETH, DAI and other tokens in order to build up our
          DAO treasury. The treasury is used to back DIAT with intrinsic value (like how gold used
          to back the Dollar).
        </p>
      </div>
      <img className={classes.tresuasuryMobileMargin} src={treasure} alt="treasure DIAT" />
    </div>
    <div className={classes.sectionRight}>
      <img src={backed} alt="DIAT backed" />
      <div>
        <div className={classes.sectionTitle}>
          <p>02</p>
          <h2>LP Fees</h2>
        </div>
        <p>
          Having a large treasury allows us to provide and own 99%+ of our liquidity pools (LP's) on
          exchanges like Uniswap. That means every single trade of DIAT pays liquidity fees back to
          our treasury.
        </p>
      </div>
    </div>
    <div className={classes.sectionLeft}>
      <div>
        <div className={classes.sectionTitle}>
          <p>03</p>
          <h2>Staking</h2>
        </div>
        <p>
          All DIAT holders can 'stake' their tokens for 3X daily compounding yield. This is good for
          holders, since they get an incredible interest rate for holding, and it's good for the
          DAO, since fewer people selling equates to increased DIAT value.
        </p>
      </div>
      <img src={staking} alt="Staking DIAT" />
    </div>
    <div className={classes.sectionRight}>
      <img src={whales} alt="Whales protection" />
      <div>
        <div className={classes.sectionTitle}>
          <p>04</p>
          <h2>Ocean Protection</h2>
        </div>
        <p>
          Unlike many other DAO's, we have a mission: to protect the ocean! We're using treasury
          funds to invest in highly-vetted ocean protection &amp; cleanup projects. Some will be
          donations, and others will be high-yield investments that also serve to build up our
          treasury value.
        </p>
      </div>
    </div>
  </div>
);

export default InfoSections;
