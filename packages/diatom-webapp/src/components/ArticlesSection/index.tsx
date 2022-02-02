import classes from './ArticlesSection.module.css';

const ArticlesSection = () => (
  <div className={classes.sectionContainer}>
    <h2>Featured Articles</h2>
    <div className={classes.articlesContainer}>
      <a
        className={classes.pollutingRiversImg}
        href="https://medium.com/@diatomdao/diatoms-investment-strategy-7b01aa6abdec"
        target="_blank"
        rel="noreferrer"
      >
        <p>Diatom DAO is Scouting 100 Polluting Rivers in Indonesia with Sungai Watch</p>
      </a>
      <a
        className={classes.schoolOfFishImg}
        href="https://medium.com/@diatomdao/introducing-diatom-dao-c9f7dd17b34c"
        target="_blank"
        rel="noreferrer"
      >
        <p>Introducing: Diatom DAO</p>
      </a>
      <a
        className={classes.removingPlasticImg}
        href="https://medium.com/@diatomdao/plastic-reduction-credits-prc-whitepaper-pt-1-3-b88c3d6e1171"
        target="_blank"
        rel="noreferrer"
      >
        <p>Plastic Removal Credits (PRC) — WhitePaper Pt. 1/3</p>
      </a>
    </div>
  </div>
);

export default ArticlesSection;
