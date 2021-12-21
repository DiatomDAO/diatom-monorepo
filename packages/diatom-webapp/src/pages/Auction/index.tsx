import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionWhalezId } from '../../state/slices/onDisplayAuction';
import { push } from 'connected-react-router';
import { whalezPath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect } from 'react';
import Auction from '../../components/Auction';
import Leaderboard from '../../components/Leaderboard';
import WhalezSection from '../../components/WhalezSection';
import LearnMore from '../../components/LearnMore';
import ColapsingSection from '../../components/ColapsingSection';
import AdivisorsSection from '../../components/AdvisorsSection';

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
        dispatch(setOnDisplayAuctionWhalezId(1));
        dispatch(push(whalezPath(1)));
      } else {
        // handle regular whalez path ids on first load
        dispatch(setOnDisplayAuctionWhalezId(initialAuctionId));
      }
    } else {
      // no whalez path id set
      dispatch(setOnDisplayAuctionWhalezId(1));
      dispatch(push(whalezPath(1)));
    }
  }, [lastAuctionWhalezId, dispatch, initialAuctionId, onDisplayAuction]);

  return (
    <div>
      <Auction auction={onDisplayAuction} />
      <WhalezSection />
      <ColapsingSection />
      <Leaderboard />
      <LearnMore />
      <AdivisorsSection />
    </div>
  );
};
export default AuctionPage;
