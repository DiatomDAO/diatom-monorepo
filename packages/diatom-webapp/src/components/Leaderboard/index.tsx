import { RootState } from '../..';
import ghostWhale from '../../assets/ghostWhale.jpg';
import { useAppSelector } from '../../hooks';
import classes from './Leaderboard.module.css';
import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react';
import { IWhaleToken, useWhaleToken } from '../../wrappers/whalezToken';
import axios from 'axios';
import { utils } from 'ethers';
import ShortAddress from '../ShortAddress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { buildEtherscanTxLink } from '../../utils/etherscan';
import { generateIpfsRestUrl, generatePinataRestUrl } from '../../utils/ipfs';

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

  const totalPlasticRemoved = formatter(auctionsMetadata.reduce(
    (a, b) => a + Number(b.plasticRemoved.replace(',', '')),
    0,
  ));

  useEffect(() => {
    const pastAuctionsDeepCopy = JSON.parse(JSON.stringify(pastAuctions)) as typeof pastAuctions;
    const nonDaoAuctions = pastAuctionsDeepCopy.filter(({ activeAuction }) =>
      Boolean(activeAuction?.bidder),
    );

    const getMeta = async () => {
      const currentEtherPrice = 4230; // axios.get(coinMarket);
      const newAuctionsMetadata = await Promise.all(
        nonDaoAuctions.map(async ({ activeAuction, bids }) => {
          const metadataURI =
            genericMetadataURI!.split('/').slice(-2)[0] +
            '/' +
            BigNumber.from(activeAuction?.whaleId).toNumber();
          const metadata = await axios.get<IWhaleToken>(generateIpfsRestUrl(metadataURI));
          const { name, image } = metadata.data;
          const eth = Number(utils.formatEther(activeAuction!.amount!));
          const totalEstPlasticRemoved = formatter(eth * currentEtherPrice * 0.65);
          return {
            whaleId: activeAuction?.whaleId,
            name,
            imgSrc: generatePinataRestUrl(image),
            plasticRemoved: totalEstPlasticRemoved,
            value: BigNumber.from(activeAuction?.amount),
            winner: bids.filter(bid => Number(utils.formatEther(bid.value!)) === eth).pop(),
          };
        }),
      );

      newAuctionsMetadata.sort((a, b) => {
        const amountA = BigNumber.from(a.winner?.value);
        const amountB = BigNumber.from(b.winner?.value);

        if (amountA.gte(amountB)) {
          return -1;
        } else {
          return 1;
        }
      });

      setAuctionsMetadata(newAuctionsMetadata);
    };

    if (genericMetadataURI) {
      getMeta();
    }
  }, [pastAuctions, genericMetadataURI]);

  return (
    <div className={classes.leaderboardContainer}>
      <h2>Whalez4Whales Leaderboard</h2>
      <div className={classes.leaderboard}>
        <div className={classes.leaderboardHeader}>
          <p>Name</p>
          <div>
            <p className={classes.textRight}>Est. Plastic Removed</p>
            <p className={classes.textRight}>Total: { totalPlasticRemoved } Kg</p>
          </div>
        </div>
        <div className={classes.leaderboardList}>
          {auctionsMetadata.length > 0 &&
            auctionsMetadata.map((whale, index) => {
              return (
                <div key={index} className={classes.leaderboardItem}>
                  <p className={classes.whalePosition}>#{index + 1}</p>
                  <img src={whale.imgSrc || ghostWhale} alt="Ghost Whale" />
                  <div className={classes.whaleNameContainer}>
                    <span className={classes.whaleName}>{whale.name || '??????'}</span>
                    <div className={classes.whaleBidder}>
                      <ShortAddress address={whale.winner.sender} avatar={true} small={true} />
                      <div className={classes.linkSymbol}>
                        <a
                          href={buildEtherscanTxLink(whale.winner.transactionHash)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FontAwesomeIcon size="xs" icon={faExternalLinkAlt} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <p className={classes.textRight}>{whale.plasticRemoved || '???.???'} Kg</p>
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
