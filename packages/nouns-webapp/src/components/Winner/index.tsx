import BigNumber from 'bignumber.js';
import classes from '../CurrentBid/CurrentBid.module.css';
import ShortAddress from '../ShortAddress';

const Winner: React.FC<{ winner: string }> = props => {
  const { winner } = props;

  return (
    <div className={classes.section}>
      <h4>Winner</h4>
      <h2>
        <ShortAddress>{winner}</ShortAddress>
      </h2>
    </div>
  );
};

export default Winner;
