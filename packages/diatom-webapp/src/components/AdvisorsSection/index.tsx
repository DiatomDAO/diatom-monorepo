import classes from './AdvisorsSection.module.css';

const AdivisorsSection = () => {
  const advisors = [
    { name: 'Christopher Verlinden, Ph.D.', description: 'U.S. Coast Guard, CTO, Applied Ocean Sciences', link: 'https://www.linkedin.com/in/christopher-verlinden-57931458' },
    { name: 'Michael Fischbach', description: 'Whale Guardians', link: 'https://www.linkedin.com/in/michael-fishbach-6221a036/' },
    { name: 'Scarlett Arana', description: 'UN Global Ambassador, SDG 14: Life Below Water', link: 'https://www.linkedin.com/in/scarlett-arana-89271332/' },
    { name: 'Dr. Nicholas Haan', description: 'Singularity University Chair: Impact, Global Grand Challenges', link: 'https://www.linkedin.com/in/nickjhaan/' },
    { name: 'Captain Charles Moore', description: 'Discovered the Great Pacific Garbage Patch', link: 'https://www.linkedin.com/in/charles-moore-9991a813/' },
    { name: 'Brooke Darshana', description: 'Zoologist & Marine Biologist, 18 years living at sea', link: 'https://www.linkedin.com/in/brooke-darshana-82484b6/' },
    { name: 'Jeremy McKane', description: 'OCN.ai', link: 'https://www.linkedin.com/in/jeremymckane/' },
    { name: 'Chad Frischmann', description: 'Project Drawdown', link: 'https://www.linkedin.com/in/chadfrischmann/' },
    { name: 'Susi Mai', description: 'Red Bull Kiteboarding Champion, Co-founder, ULTRAMARINE', link: 'https://www.linkedin.com/in/susi-mai-0a7a0910/' },
  ];

  return (
    <div className={classes.advisorsSection}>
      <h1>Ocean Advisors</h1>
      <div className={classes.advisorsContainer}>
        {advisors.map(({ name, description, link }) => (
          <div key={name} className={classes.adivisorItem}>
            <a target="_blank" rel="noreferrer" href={link}><h4>{name}</h4></a>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdivisorsSection;
