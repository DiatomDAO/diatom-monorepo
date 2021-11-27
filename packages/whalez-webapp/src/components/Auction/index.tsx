import { Col } from 'react-bootstrap';
import StandaloneNoun from '../StandaloneWhalez';
import AuctionActivity from '../AuctionActivity';
import { Row, Container } from 'react-bootstrap';
import { LoadingWhalez } from '../Whalez';
import { Auction as IAuction } from '../../wrappers/whalezAuction';
import classes from './Auction.module.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setNextOnDisplayAuctionNounId,
  setPrevOnDisplayAuctionNounId,
} from '../../state/slices/onDisplayAuction';

interface AuctionProps {
  auction?: IAuction;
}

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const lastNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionNounId());
    currentAuction && history.push(`/auction/${currentAuction.whaleId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionNounId());
    currentAuction && history.push(`/auction/${currentAuction.whaleId.toNumber() + 1}`);
  };

  const whalezContent = currentAuction && (
    <div className={classes.whalezWrapper}>
      <StandaloneNoun
        whaleId={currentAuction.whaleId}
      />
    </div>
  );

  const loadingNoun = (
    <div className={classes.whalezWrapper}>
      <LoadingWhalez />
    </div>
  );

  const currentAuctionActivityContent = currentAuction && lastNounId && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={currentAuction.whaleId.eq(1)}
      isLastAuction={currentAuction.whaleId.eq(lastNounId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
      displayGraphDepComps={true}
    />
  );

  return (
    <div>
      <Container fluid="lg">
        <Row>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
            {currentAuction ? whalezContent : loadingNoun}
          </Col>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
            {currentAuction && currentAuctionActivityContent}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auction;