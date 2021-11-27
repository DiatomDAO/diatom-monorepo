import { BigNumber as EthersBN } from 'ethers';
import { useWhaleToken, IWhaleToken } from '../../wrappers/nounToken';
import Noun from '../Whalez';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface StandaloneWhalezProps {
  whaleId: EthersBN;
  noDescription?: Boolean;
}

const generateIpfsRestUrl = (ipfsUrl: string) => {
  const urlPart = ipfsUrl?.split('://')?.pop()
  return `https://ipfs.io/ipfs/${urlPart}`
}

const StandaloneWhalez: React.FC<StandaloneWhalezProps> = (props: StandaloneWhalezProps) => {
  const { whaleId, noDescription } = props;
  const id = whaleId;
  const whaleURI = useWhaleToken(id);
  const [currentWhale, setCurrentWhale] = useState<IWhaleToken>({
    description: '',
    image: '',
    name: ''
  });

  const getWhale = async (whaleURI: string) => {  
    const whaleTokenData = await axios.get<IWhaleToken>(generateIpfsRestUrl(whaleURI))
  
    setCurrentWhale({
      ...whaleTokenData.data,
      image: generateIpfsRestUrl(whaleTokenData.data.image)
    })
  };

  useEffect(() => {
    if(whaleURI){
      getWhale(whaleURI)
    }
  }, [whaleURI])

  return (
    <Noun whaleId={whaleId?.toString()} imgPath={currentWhale.image} alt={currentWhale.description} description={currentWhale.description} name={currentWhale.name}  noDescription={noDescription} />
  );
};

export default StandaloneWhalez;
