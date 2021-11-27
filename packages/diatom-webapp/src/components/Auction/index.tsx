import { Col } from 'react-bootstrap';
import StandaloneWhalez from '../StandaloneWhalez';
import AuctionActivity from '../AuctionActivity';
import { Row, Container } from 'react-bootstrap';
import { LoadingWhalez } from '../Whalez';
import { Auction as IAuction } from '../../wrappers/whalezAuction';
import classes from './Auction.module.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setNextOnDisplayAuctionWhalezId,
  setPrevOnDisplayAuctionWhalezId,
} from '../../state/slices/onDisplayAuction';

interface AuctionProps {
  auction?: IAuction;
}

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const lastWhalezId = useAppSelector(state => state.onDisplayAuction.lastAuctionWhalezId);

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionWhalezId());
    currentAuction && history.push(`/auction/${currentAuction.whaleId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionWhalezId());
    currentAuction && history.push(`/auction/${currentAuction.whaleId.toNumber() + 1}`);
  };

  const whalezContent = currentAuction && (
    <div className={classes.whalezWrapper}>
      <StandaloneWhalez
        whaleId={currentAuction.whaleId}
      />
    </div>
  );

  const loadingWhalez = (
    <div className={classes.whalezWrapper}>
      <LoadingWhalez />
    </div>
  );

  const currentAuctionActivityContent = currentAuction && lastWhalezId && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={currentAuction.whaleId.eq(1)}
      isLastAuction={currentAuction.whaleId.eq(lastWhalezId)}
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
            {currentAuction ? whalezContent : loadingWhalez}
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
