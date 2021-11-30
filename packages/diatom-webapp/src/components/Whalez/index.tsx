import classes from './Whalez.module.css';
import React from 'react';
import loadingWhalez from '../../assets/diatomLoading.svg';
import Image from 'react-bootstrap/Image';

export const LoadingWhalez = () => {
  return (
    <div className={`${classes.loadingWrapper} ${classes.imgWrapper}`}>
      <Image className={`${classes.loadingWhalez} ${classes.img}`} src={loadingWhalez} alt={'loading Whale'} fluid />
    </div>
  );
};

const Whalez: React.FC<{
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
    <div className={`${!imgPath ? classes.loadingWrapper : ''} ${classes.imgWrapper} ${wrapperClassName}`}>
      <Image
        className={`${classes.img} ${className} ${!imgPath ? classes.loadingWhalez : ''}`}
        src={imgPath ? imgPath : loadingWhalez}
        alt={alt}
        fluid
      />
      {!noDescription && imgPath && (
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

export default Whalez;
