//import { externalURL, ExternalURL } from '../../utils/externalURL';
import logo from './assets/logo-icon.svg';

import classes from './LandingHero.module.css';

const LandingHero = () => {
  // const twitterURL = externalURL(ExternalURL.twitter);
  // const discordURL = externalURL(ExternalURL.discord);

  return (
    <div className={classes.hero}>
      <img src={logo} alt="Diatom DAO logo" />
      <h2>The DAO for Ocean Protection</h2>
      <p>We build & invest in data-driven solutions for ocean conservation, starting with the first tokenized Plastic Removal Credit (PRC)</p>
      <div className={`${classes.buttonsContainer}`}>
        <a target="_blank" href="https://app.diatom.fund">
          Enter the App
        </a>
      </div>
    </div>
  );
};

export default LandingHero;
