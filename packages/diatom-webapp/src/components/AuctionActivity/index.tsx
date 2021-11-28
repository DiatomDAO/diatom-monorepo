import { Auction } from '../../wrappers/whalezAuction';
import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { Row, Col } from 'react-bootstrap';
import classes from './AuctionActivity.module.css';
import bidHistoryClasses from './BidHistory.module.css';
import Bid from '../Bid';
import AuctionTimer from '../AuctionTimer';
import CurrentBid from '../CurrentBid';
import Winner from '../Winner';
import BidHistory from '../BidHistory';
import { Modal } from 'react-bootstrap';
import AuctionNavigation from '../AuctionNavigation';
import AuctionActivityWrapper from '../AuctionActivityWrapper';
import AuctionActivityWhalezTitle from '../AuctionActivityWhalezTitle';
import AuctionActivityDateHeadline from '../AuctionActivityDateHeadline';
import BidHistoryBtn from '../BidHistoryBtn';
import StandaloneWhalez from '../StandaloneWhalez';
import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import { utils } from 'ethers';
import prcIcon from '../../assets/prc.png';

const openEtherscanBidHistory = () => {
  const url = buildEtherscanAddressLink(config.addresses.whalezAuctionHouseProxy);
  window.open(url);
};

interface AuctionActivityProps {
  auction: Auction;
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
  displayGraphDepComps: boolean;
}

const AuctionActivity: React.FC<AuctionActivityProps> = (props: AuctionActivityProps) => {
  const {
    auction,
    isFirstAuction,
    isLastAuction,
    onPrevAuctionClick,
    onNextAuctionClick,
    displayGraphDepComps,
  } = props;

  const [auctionEnded, setAuctionEnded] = useState(false);
  const [auctionTimer, setAuctionTimer] = useState(false);

  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  const showBidModalHandler = () => {
    setShowBidHistoryModal(true);
  };
  const dismissBidModalHanlder = () => {
    setShowBidHistoryModal(false);
  };

  const bidHistoryTitle = (
    <h1>
      Whale {auction && auction.whaleId.toString()}
      <br /> Bid History
    </h1>
  );

  // timer logic - check auction status every 30 seconds, until five minutes remain, then check status every second
  useEffect(() => {
    if (!auction) return;

    const timeLeft = Number(auction.endTime) - Math.floor(Date.now() / 1000);

    if (auction && timeLeft <= 0) {
      setAuctionEnded(true);
    } else {
      setAuctionEnded(false);
      const timer = setTimeout(
        () => {
          setAuctionTimer(!auctionTimer);
        },
        timeLeft > 300 ? 30000 : 1000,
      );

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auctionTimer, auction]);

  if (!auction) return null;

  const formatter = (amount: number | bigint) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(amount);

  const eth = new BigNumber(utils.formatEther(auction.amount.toString())).toFixed(2);
  const totalEstPlasticRemoved = formatter(Number(eth) * 4230 * 0.65);

  return (
    <>
      {showBidHistoryModal && (
        <Modal
          show={showBidHistoryModal}
          onHide={dismissBidModalHanlder}
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton className={classes.modalHeader}>
            <div className={classes.modalHeaderWhalezImgWrapper}>
              <StandaloneWhalez whaleId={auction && auction.whaleId} noDescription />
            </div>
            <Modal.Title className={classes.modalTitleWrapper}>{bidHistoryTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BidHistory auctionId={auction.whaleId.toString()} max={9999} />
          </Modal.Body>
        </Modal>
      )}

      <AuctionActivityWrapper>
        <div className={classes.informationRow}>
          <Row className={classes.activityRow}>
            <Col lg={12}>
              <AuctionActivityDateHeadline startTime={auction.startTime} />
            </Col>
            <Col lg={12} className={classes.colAlignCenter}>
              <AuctionActivityWhalezTitle whaleId={auction.whaleId} />
              {displayGraphDepComps && (
                <div style={{ display: 'inline-block' }}>
                  <AuctionNavigation
                    isFirstAuction={isFirstAuction}
                    isLastAuction={isLastAuction}
                    onNextAuctionClick={onNextAuctionClick}
                    onPrevAuctionClick={onPrevAuctionClick}
                  />
                </div>
              )}
            </Col>
          </Row>
          <Row className={classes.activityRow}>
            <Col lg={5} className={classes.currentBidCol}>
              <CurrentBid
                currentBid={new BigNumber(auction.amount.toString())}
                auctionEnded={auctionEnded}
              />
            </Col>
            <Col lg={5} className={classes.auctionTimerCol}>
              {auctionEnded ? (
                <Winner winner={auction.bidder} />
              ) : (
                <AuctionTimer auction={auction} auctionEnded={auctionEnded} />
              )}
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <h4>
                Est. Plastic Removed <span className={classes.infoToolTip}>&#9432;</span>
              </h4>
              <h2 style={{ marginBottom: '0' }}>
                <img className={classes.prcIcon} src={prcIcon} alt="PRC icon" />
                {totalEstPlasticRemoved}
                <span style={{ fontSize: '1rem' }}> Kg</span>
              </h2>
            </Col>
          </Row>
        </div>
        {isLastAuction && (
          <Row className={classes.activityRow}>
            <Col lg={12}>
              <Bid auction={auction} auctionEnded={auctionEnded} />
            </Col>
          </Row>
        )}
        <Row className={classes.activityRow}>
          <Col lg={12}>
            {displayGraphDepComps && (
              <BidHistory
                auctionId={auction.whaleId.toString()}
                max={3}
                classes={bidHistoryClasses}
              />
            )}
            {/* If no bids, show nothing. If bids avail:graph is stable? show bid history modal,
            else show etherscan contract link */}
            {!auction.amount.eq(0) &&
              (displayGraphDepComps ? (
                <BidHistoryBtn onClick={showBidModalHandler} />
              ) : (
                <BidHistoryBtn onClick={openEtherscanBidHistory} />
              ))}
          </Col>
        </Row>
      </AuctionActivityWrapper>
    </>
  );
};

export default AuctionActivity;
