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
      <WhalezSection />
      <ColapsingSection />
      <Leaderboard />
      <LearnMore />
      {/* <DiatomInfo />
      <Tokenomics />
      <InfoSections /> */}
    </div>
  );
};
export default AuctionPage;
