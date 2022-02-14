//import { externalURL, ExternalURL } from '../../utils/externalURL';
import logo from './assets/logo-icon.svg';

import classes from './LandingHero.module.css';

const LandingHero = () => {
  // const twitterURL = externalURL(ExternalURL.twitter);
  // const discordURL = externalURL(ExternalURL.discord);

  // const launchDate = 1644868800
  // let now = Math.floor(Date.now() / 1000)
  // const launched = now >= launchDate

  return (
    <div className={classes.heroContainer}>
      <div className={classes.hero}>
        <img src={logo} alt="Diatom DAO logo" />
        <h2>A DAO investing <br /> in ocean protection</h2>
        <p>
          Leveraging the power of DeFi to protect and regenerate the earth's most valuable asset
        </p>
        <div className={classes.buttonsContainer}>
          <a href="#1" target="_blank">
            Enter App
          </a>
          <a href="#123" target="_blank">
            Buy DIAT
          </a>
        </div>
      </div>
      <div className={classes.videoContainer}></div>
    </div>
  );
};

export default LandingHero;
