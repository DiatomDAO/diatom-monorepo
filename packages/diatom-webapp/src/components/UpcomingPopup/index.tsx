import { useState } from 'react';
import closeIcon from '../../assets/closeIcon.svg';

import classes from './UpcomingPopup.module.css';

const UpcomingPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const milestones = [
    {
      title: 'Something Awesome #1',
      date: 'February 20, 2022',
    },
    {
      title: 'Something Awesome #2',
      date: 'March 6, 2022',
    },
    {
      title: 'Something Awesome #3',
      date: 'March 20, 2022',
    },
    {
      title: 'Something Awesome #4',
      date: 'March 28, 2022',
    },
  ];

  return (
    <>
      {isOpen && (
        <div className={classes.popupContainer}>
          <h2>Upcoming Milestones</h2>
          {milestones.map((milestone, index) => (
            <div key={index} className={classes.milestone}>
              <p>{milestone.title}</p>
              <p>{milestone.date}</p>
            </div>
          ))}
          <button className={classes.closeButton} type="button" onClick={() => setIsOpen(false)}>
            <img src={closeIcon} alt="Close icon" />
          </button>
        </div>
      )}
    </>
  );
};

export default UpcomingPopup;
