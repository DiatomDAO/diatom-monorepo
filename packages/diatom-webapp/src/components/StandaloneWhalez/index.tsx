import { BigNumber as EthersBN } from 'ethers';
import { IWhaleToken } from '../../wrappers/whalezToken';
import Whalez from '../Whalez';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { generatePinataRestUrl } from '../../utils/ipfs';
import config from '../../config';

interface StandaloneWhalezProps {
  whaleId: EthersBN;
  noDescription?: Boolean;
}

const initialWhaleState = {
  description: '',
  image: '',
  name: '',
};

const StandaloneWhalez: React.FC<StandaloneWhalezProps> = (props: StandaloneWhalezProps) => {
  const { whaleId, noDescription } = props;
  const id = whaleId;
  const whaleURI = config.app.ipfsUri + '/' + id;
  const [currentWhale, setCurrentWhale] = useState<IWhaleToken>(initialWhaleState);

  const getWhale = async (whaleURI: string) => {
    const whaleTokenData = await axios.get<IWhaleToken>(generatePinataRestUrl(whaleURI));

    const whaleImageData = await axios.get(generatePinataRestUrl(whaleTokenData.data.image), {
      responseType: 'arraybuffer',
    });

    const whaleImageBase64 = Buffer.from(whaleImageData.data, 'binary').toString('base64');

    setCurrentWhale({
      ...whaleTokenData.data,
      image: `data:image/png;base64, ${whaleImageBase64}`,
    });
  };

  useEffect(() => {
    setCurrentWhale(initialWhaleState);
    if (whaleURI) {
      getWhale(whaleURI);
    }
  }, [whaleURI]);

  return (
    <Whalez
      whaleId={whaleId?.toString()}
      imgPath={currentWhale.image}
      alt={currentWhale.description}
      description={currentWhale.description}
      name={currentWhale.name}
      noDescription={noDescription}
    />
  );
};

export default StandaloneWhalez;
