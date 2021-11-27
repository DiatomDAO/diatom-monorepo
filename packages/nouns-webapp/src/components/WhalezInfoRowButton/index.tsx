import React from 'react';
import { Image } from 'react-bootstrap';
import classes from './NounInfoRowButton.module.css';

interface NounInfoRowButtonProps {
  iconImgSource: string;
  btnText: string;
  onClickHandler: () => void;
}

const NounInfoRowButton: React.FC<NounInfoRowButtonProps> = props => {
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

export default NounInfoRowButton;
