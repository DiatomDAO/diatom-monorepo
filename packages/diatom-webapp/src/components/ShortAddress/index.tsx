import { useReverseENSLookUp } from '../../utils/ensLookup';
import { useEthers } from '@usedapp/core';
import Davatar from '@davatar/react';
import classes from './ShortAddress.module.css';

const ShortAddress: React.FC<{ address: string; avatar?: boolean }> = props => {
  let { address, avatar } = props;
  const { library: provider } = useEthers();

  address = address || '0x0000000000000000000000000000000000000000';
  const ens = useReverseENSLookUp(address);
  const shortAddress = address && [address.substr(0, 4), address.substr(38, 4)].join('...');

  if (avatar) {
    return (
      <div className={classes.shortAddress}>
        {avatar && <Davatar size={24} address={address} provider={provider} />}
        {ens ? ens : shortAddress}
      </div>
    );
  }

  return <>{ens ? ens : shortAddress}</>;
};

export default ShortAddress;
