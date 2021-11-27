import classes from './Noun.module.css';
import React from 'react';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import Image from 'react-bootstrap/Image';

export const LoadingNoun = () => {
  return (
    <div className={classes.imgWrapper}>
      <Image className={classes.img} src={loadingNoun} alt={'loading Whale'} fluid />
    </div>
  );
};

const Noun: React.FC<{
  imgPath: string;
  alt: string;
  whaleId?: string;
  name?: string;
  description?: string,
  className?: string;
  wrapperClassName?: string;
  noDescription?: Boolean;
}> = props => {
  const { imgPath, alt, className, wrapperClassName, noDescription, name, whaleId, description } = props;
  return (
    <div className={`${classes.imgWrapper} ${wrapperClassName}`}>
      <Image
        className={`${classes.img} ${className}`}
        src={imgPath ? imgPath : loadingNoun}
        alt={alt}
        fluid
      />
      {!noDescription && (
        <div className={classes.imgTitle}>
          <h3>
            {name} <span style={{ color: '#828282' }}>| Whale {whaleId}</span>
          </h3>
          <p>"{description}"</p>
        </div>
      )}
    </div>
  );
};

export default Noun;
