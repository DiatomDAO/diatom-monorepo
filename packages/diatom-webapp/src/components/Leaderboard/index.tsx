import ghostWhale from '../../assets/ghostWhale.jpg'
import classes from './Leaderboard.module.css';

const Leaderboard = () => {
  const whales = [{ name: 'Placeholder', plasticRemoved: 0 }].sort((a, b) => {
    if (a.plasticRemoved < b.plasticRemoved) return 1;
    if (a.plasticRemoved > b.plasticRemoved) return -1;
    return 0;
  });

  const formatter = (amount: number | bigint) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className={classes.leaderboardContainer}>
      <h2>Leaderboard</h2>
      <div className={classes.leaderboard}>
        <div className={classes.leaderboardHeader}>
          <p>Name</p>
          <p>Est. Plastic Removed</p>
        </div>
        <div className={classes.leaderboardList}>
          {whales.length > 1 &&
            whales.map((whale, index) => {
              return (
                <div key={index} className={classes.leaderboardItem}>
                  <p className={classes.whalePosition}>#{index + 1}</p>
                  <div></div>
                  <p className={classes.whaleName}>{whale.name}</p>
                  <p>{formatter(whale.plasticRemoved)} Kg</p>
                </div>
              );
            })}
          {whales.length <= 1 && (
            <div className={classes.leaderboardItem}>
              <p className={classes.whalePosition}>#{'??'}</p>
              <img src={ghostWhale} alt="Ghost Whale" />
              <p className={classes.whaleName}>{'??????'}</p>
              <p>{'???.???'} Kg</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
