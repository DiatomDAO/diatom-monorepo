import classes from './Leaderboard.module.css';

const Leaderboard = () => {
  const whales = [
    { name: 'Some Great Name', plasticRemoved: 300000.00123 },
    { name: 'Cetacious Prime', plasticRemoved: 300001.12 },
    { name: 'Cetacious Prime', plasticRemoved: 300002 },
    { name: 'Cetacious Prime', plasticRemoved: 402003 },
    { name: 'Cetacious Prime', plasticRemoved: 300004 },
    { name: 'Cetacious Prime', plasticRemoved: 300005.23412 },
    { name: 'Cetacious Prime', plasticRemoved: 3 },
    { name: 'Cetacious Prime', plasticRemoved: 2 },
    { name: 'Cetacious Prime', plasticRemoved: 1 },
    { name: 'Cetacious Prime', plasticRemoved: 1234 },
    { name: 'Cetacious Prime', plasticRemoved: 3333 },
    { name: 'Cetacious Prime', plasticRemoved: 123 },
  ].sort((a, b) => {
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
          {whales.map((whale, index) => {
            return (
              <div key={index} className={classes.leaderboardItem}>
                <p className={classes.whalePosition}>#{index + 1}</p>
                <div></div>
                <p className={classes.whaleName}>{whale.name}</p>
                <p>{formatter(whale.plasticRemoved)} Kg</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
