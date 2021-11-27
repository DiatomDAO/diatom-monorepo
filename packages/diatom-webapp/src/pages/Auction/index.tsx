import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionWhalezId } from '../../state/slices/onDisplayAuction';
import { push } from 'connected-react-router';
import { whalezPath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect } from 'react';
import DiatomInfo from '../../components/DiatomInfo';
// import LandingHero from '../../components/LandingHero';
import InfoSections from '../../components/InfoSections';
import Auction from '../../components/Auction';
// import DAOnstream from '../../components/DAOnstream';
import Tokenomics from '../../components/Tokenomics';
import Leaderboard from '../../components/Leaderboard';
// import Auction from '../../components/Auction';

interface AuctionPageProps {
  initialAuctionId?: number;
}

const AuctionPage: React.FC<AuctionPageProps> = props => {
  const { initialAuctionId } = props;
  const onDisplayAuction = useOnDisplayAuction();
  const lastAuctionWhalezId = useAppSelector(state => state.onDisplayAuction.lastAuctionWhalezId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!lastAuctionWhalezId) return;

    if (initialAuctionId !== undefined) {
      // handle out of bounds whalez path ids
      if (initialAuctionId > lastAuctionWhalezId || initialAuctionId < 0) {
        dispatch(setOnDisplayAuctionWhalezId(lastAuctionWhalezId));
        dispatch(push(whalezPath(lastAuctionWhalezId)));
      } else {
        if (onDisplayAuction === undefined) {
          // handle regular whalez path ids on first load
          dispatch(setOnDisplayAuctionWhalezId(initialAuctionId));
        }
      }
    } else {
      // no whalez path id set
      if (lastAuctionWhalezId) {
        dispatch(setOnDisplayAuctionWhalezId(lastAuctionWhalezId));
      }
    }
  }, [lastAuctionWhalezId, dispatch, initialAuctionId, onDisplayAuction]);

  return (
    <div>
      <Auction auction={onDisplayAuction} />
      <Leaderboard />
      {/* <LandingHero /> */}
      <DiatomInfo />
      <Tokenomics />
      <InfoSections />
      {/* <DAOnstream /> */}
    </div>
  );
};
export default AuctionPage;
