import pollutingRivers from './assets/pollutingRivers.jpg';

import classes from './ArticlesSection.module.css';

const ArticlesSection = () => (
  <div className={classes.sectionContainer}>
    <h2>Featured Articles</h2>
    <div className={classes.articlesContainer}>
      <a
        href="https://medium.com/@diatomdao/diatoms-investment-strategy-7b01aa6abdec"
        target="_blank"
        rel="noreferrer"
      >
        <p>Diatom DAO is Scouting 100 Polluting Rivers in Indonesia with Sungai Watch</p>
        <img src={pollutingRivers} alt="Polluted River" />
      </a>
      <a
        href="https://medium.com/@diatomdao/diatoms-investment-strategy-7b01aa6abdec"
        target="_blank"
        rel="noreferrer"
      >
        <p>Diatom DAO is Scouting 100 Polluting Rivers in Indonesia with Sungai Watch</p>
        <img src={pollutingRivers} alt="Polluted River" />
      </a>
      <a
        href="https://medium.com/@diatomdao/diatoms-investment-strategy-7b01aa6abdec"
        target="_blank"
        rel="noreferrer"
      >
        <p>Diatom DAO is Scouting 100 Polluting Rivers in Indonesia with Sungai Watch</p>
        <img src={pollutingRivers} alt="Polluted River" />
      </a>
    </div>
  </div>
);

export default ArticlesSection;
