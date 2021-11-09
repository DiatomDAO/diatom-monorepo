import network from './assets/network.jpg';

import classes from './HowItWorks.module.css';

const HowItWorks = () => (
  <div id="works" className={classes.container}>
    <h2>How it works</h2>
    <div className={classes.contentWrapper}>
      <img className={classes.contentImg} src={network} alt="Diatom sea" />
      <div className={classes.content}>
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

export default HowItWorks;
