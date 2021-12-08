import classes from './AdvisorsSection.module.css';

const AdivisorsSection = () => {
  const advisors = [
    { name: 'Christopher Verlinden, Ph.D.', description: 'U.S. Coast Guard, CTO, Applied Ocean Sciences' },
    { name: 'Michael Fischbach', description: 'Whale Guardians' },
    { name: 'Scarlett Arana', description: 'UN Global Ambassador, SDG 14: Life Below Water' },
    { name: 'Nicholas Haan', description: 'Singularity University Chair: Impact, Global Grand Challenges' },
    { name: 'Captain Charles Moore', description: 'Discovered the Great Pacific Garbage Patch' },
    { name: 'Brooke Darshana', description: 'Zoologist & Marine Biologist, 18 years living at sea' },
    { name: 'Jeremy McKane', description: 'OCN.ai, Artist, Aerobotics' },
    { name: 'Chad Frischmann', description: 'Project Drawdown' },
    { name: 'Susi Mai', description: 'Red Bull Kiteboarding Champion, Co-founder, ULTRAMARINE' },
  ];

  return (
    <div className={classes.advisorsSection}>
      <h1>Ocean Advisors</h1>
      <div className={classes.advisorsContainer}>
        {advisors.map(({ name, description }) => (
          <div key={name} className={classes.adivisorItem}>
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdivisorsSection;
