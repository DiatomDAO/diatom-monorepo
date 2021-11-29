import { BigNumber as EthersBN } from 'ethers';
import { useWhaleToken, IWhaleToken } from '../../wrappers/whalezToken';
import Whalez from '../Whalez';
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
    const {name, description, image} = whaleTokenData.data;
  
    setCurrentWhale({
      name,
      description,
      image: generateIpfsRestUrl(image)
    })
  };

  useEffect(() => {
    if(whaleURI){
      getWhale(whaleURI)
    }
  }, [whaleURI])

  return (
    <Whalez whaleId={whaleId?.toString()} imgPath={currentWhale.image} alt={currentWhale.description} description={currentWhale.description} name={currentWhale.name}  noDescription={noDescription} />
  );
};

export default StandaloneWhalez;
