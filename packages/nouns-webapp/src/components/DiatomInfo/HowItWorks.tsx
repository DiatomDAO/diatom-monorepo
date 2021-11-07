import contentSea from './assets/contentSea.jpg';

import classes from './HowItWorks.module.css';

const HowItWorks = () => (
  <div id="works" className={classes.container}>
    <h2>How it works</h2>
    <div className={classes.contentWrapper}>
      <img className={classes.contentImg} src={contentSea} alt="Diatom sea" />
      <div className={classes.content}>
        <h3>Diatom leverages the power of DeFi to establish a community-governed DAO</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim.
        </p>
      </div>
    </div>
  </div>
);

export default HowItWorks;
