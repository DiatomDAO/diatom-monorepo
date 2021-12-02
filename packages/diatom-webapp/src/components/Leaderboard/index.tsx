import { RootState } from '../..';
import ghostWhale from '../../assets/ghostWhale.jpg';
import { useAppSelector } from '../../hooks';
import classes from './Leaderboard.module.css';
import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react';
import { IWhaleToken, useWhaleToken } from '../../wrappers/whalezToken';
import axios from 'axios';
import { utils } from 'ethers';

const generateIpfsRestUrl = (ipfsUrl: string): string => {
  const urlPart = ipfsUrl?.split('://')?.pop();
  return `https://ipfs.io/ipfs/${urlPart}`;
};

const formatter = (amount: number | bigint) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount);

const Leaderboard = () => {
  const pastAuctions = useAppSelector((state: RootState) => state.pastAuctions.pastAuctions);

  const genericMetadataURI = useWhaleToken(
    pastAuctions.length ? pastAuctions[0].activeAuction!.whaleId : BigNumber.from(1),
  );
  const [auctionsMetadata, setAuctionsMetadata] = useState<any[]>([]);

  useEffect(() => {
    const nonDaoAuctions = pastAuctions.filter(({ activeAuction }) => Boolean(activeAuction?.bidder));
    nonDaoAuctions.sort((a, b) => {
      const amountA = BigNumber.from(a.activeAuction?.amount);
      const amountB = BigNumber.from(b.activeAuction?.amount);
      if (amountA >= amountB) {
        return -1;
      } else {
        return 1;
      }
    });
    
    const getMeta = async () => {
      const currentEtherPrice = 4320; // axios.get(coinMarket);
      const newAuctionsMetadata = await Promise.all(
        nonDaoAuctions.map(async ({ activeAuction }) => {
          const metadataURI =
            genericMetadataURI!.slice(0, genericMetadataURI!.length - 1) +
            BigNumber.from(activeAuction?.whaleId).toNumber();
          const metadata = await axios.get<IWhaleToken>(generateIpfsRestUrl(metadataURI));
          const { name, image } = metadata.data;
          const eth = Number(utils.formatEther(activeAuction!.amount!));
          const totalEstPlasticRemoved = formatter(eth * currentEtherPrice * 0.65);
          return {
            whaleId: activeAuction?.whaleId,
            name,
            imgSrc: generateIpfsRestUrl(image),
            plasticRemoved: totalEstPlasticRemoved,
          };
        }),
      );
      setAuctionsMetadata(newAuctionsMetadata);
    };

    if (genericMetadataURI) {
      getMeta();
    }
  }, [pastAuctions, genericMetadataURI]);

  return (
    <div className={classes.leaderboardContainer}>
      <h2>Leaderboard</h2>
      <div className={classes.leaderboard}>
        <div className={classes.leaderboardHeader}>
          <p>Name</p>
          <p>Est. Plastic Removed</p>
        </div>
        <div className={classes.leaderboardList}>
          {auctionsMetadata.length > 0 &&
            auctionsMetadata.map((whale, index) => {
              return (
                <div key={index} className={classes.leaderboardItem}>
                  <p className={classes.whalePosition}>#{index + 1}</p>
                  <img src={whale.imgSrc || ghostWhale} alt="Ghost Whale" />
                  <p className={classes.whaleName}>{whale.name || '??????'}</p>
                  <p>{whale.plasticRemoved || '???.???'} Kg</p>
                </div>
              );
            })}
          {auctionsMetadata.length < 1 && (
            <div className={classes.leaderboardItem}>
              <p className={classes.whalePosition}>#{'??'}</p>
              <img src={ghostWhale} alt="Ghost Whale" />
              <p className={classes.whaleName}>{'??????'}</p>
              <p>{'???.???'} Kg</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
