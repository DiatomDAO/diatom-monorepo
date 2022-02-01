import pollutingRivers from './assets/pollutingRivers.jpg';
import schoolOfFish from './assets/schoolOfFish.jpg';
import removingPlastic from './assets/removingPlastic.jpg';

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
        href="https://medium.com/@diatomdao/introducing-diatom-dao-c9f7dd17b34c"
        target="_blank"
        rel="noreferrer"
      >
        <p>Introducing: Diatom DAO</p>
        <img src={schoolOfFish} alt="Polluted River" />
      </a>
      <a
        href="https://medium.com/@diatomdao/plastic-reduction-credits-prc-whitepaper-pt-1-3-b88c3d6e1171"
        target="_blank"
        rel="noreferrer"
      >
        <p>Plastic Removal Credits (PRC) — WhitePaper Pt. 1/3</p>
        <img src={removingPlastic} alt="Polluted River" />
      </a>
    </div>
  </div>
);

export default ArticlesSection;
