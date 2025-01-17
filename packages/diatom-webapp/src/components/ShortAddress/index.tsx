import { useReverseENSLookUp } from '../../utils/ensLookup';
import { useEthers } from '@usedapp/core';
import Davatar from '@davatar/react';
import classes from './ShortAddress.module.css';

const ShortAddress: React.FC<{ address: string; avatar?: boolean; small?: boolean }> = props => {
  let { address, avatar, small } = props;
  const { library: provider } = useEthers();

  address = address || '0x0000000000000000000000000000000000000000';
  const ens = useReverseENSLookUp(address);
  const shortAddress = address && [address.substr(0, 4), address.substr(38, 4)].join('...');
  const shortEns =
    ens && ens.length > 10 ? [ens.substr(0, 4), ens.substr(ens.length - 5, 4)].join('...') : ens;

  if (avatar) {
    return (
      <div className={`${small ? classes.shortAddressSmall : ''} ${classes.shortAddress}`} title={ens ? ens : shortAddress}>
        {avatar && <Davatar size={small ? 12 : 24} address={address} provider={provider} />}
        {ens ? shortEns : shortAddress}
      </div>
    );
  }

  return <>{ens ? ens : shortAddress}</>;
};

export default ShortAddress;
