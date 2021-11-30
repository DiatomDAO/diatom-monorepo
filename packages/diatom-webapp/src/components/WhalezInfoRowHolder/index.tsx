import { useQuery } from '@apollo/client';
import React from 'react';
import { Image } from 'react-bootstrap';
import _LinkIcon from '../../assets/icons/Link.svg';
import { whalezQuery } from '../../wrappers/subgraph';
import _HeartIcon from '../../assets/icons/Heart.svg';
import classes from './WhalezInfoRowHolder.module.css';

import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import ShortAddress from '../ShortAddress';

interface WhalezInfoRowHolderProps {
  whaleId: number;
}

const WhalezInfoRowHolder: React.FC<WhalezInfoRowHolderProps> = props => {
  const { whaleId } = props;

  const { loading, error, data } = useQuery(whalezQuery(whaleId.toString()));

  const etherscanURL = buildEtherscanAddressLink(data && data.whalez.owner.id);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <div>Failed to fetch whalez info</div>;
  }

  const shortAddressComponent = <ShortAddress address={data && data.whalez.owner.id} />;

  return (
    <div className={classes.whalezHolderInfoContainer}>
      <span>
        <Image src={_HeartIcon} className={classes.heartIcon} />
      </span>
      <span>Held by</span>
      <span>
        <a
          className={classes.whalezHolderEtherscanLink}
          href={etherscanURL}
          target={'_blank'}
          rel="noreferrer"
        >
          {data.whalez.owner.id.toLowerCase() ===
          config.addresses.whalezAuctionHouseProxy.toLowerCase()
            ? 'Whalezs Auction House'
            : shortAddressComponent}
        </a>
      </span>
      <span className={classes.linkIconSpan}>
        <Image src={_LinkIcon} className={classes.linkIcon} />
      </span>
    </div>
  );
};

export default WhalezInfoRowHolder;
