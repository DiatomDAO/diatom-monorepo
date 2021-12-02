import rightArrow from '../../assets/rightArrow.svg';

import classes from './LearnMore.module.css';

const LearnMore = () => (
  <a href="/dao" className={classes.text}>
    Learn more about Diatom DAO
    <img src={rightArrow} alt="Right arrow" />
  </a>
);

export default LearnMore;
