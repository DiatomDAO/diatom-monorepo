import React from 'react';
import { Image } from 'react-bootstrap';
import classes from './WhalezInfoRowButton.module.css';

interface WhalezInfoRowButtonProps {
  iconImgSource: string;
  btnText: string;
  onClickHandler: () => void;
}

const WhalezInfoRowButton: React.FC<WhalezInfoRowButtonProps> = props => {
  const { iconImgSource, btnText, onClickHandler } = props;
  return (
    <div className={classes.whalezButton} onClick={onClickHandler}>
      <div className={classes.whalezButtonContents}>
        <Image src={iconImgSource} className={classes.buttonIcon} />
        {btnText}
      </div>
    </div>
  );
};

export default WhalezInfoRowButton;
