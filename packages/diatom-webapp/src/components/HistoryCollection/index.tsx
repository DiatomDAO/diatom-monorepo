import { BigNumber, BigNumberish } from 'ethers';
import Section from '../../layout/Section';
import classes from './HistoryCollection.module.css';
import clsx from 'clsx';
import StandaloneWhalez from '../StandaloneWhalez';
import { LoadingWhalez } from '../Whalez';
import config from '../../config';
import { Container, Row } from 'react-bootstrap';

interface HistoryCollectionProps {
  historyCount: number;
  latestWhalezId: BigNumberish;
}

const HistoryCollection: React.FC<HistoryCollectionProps> = (props: HistoryCollectionProps) => {
  const { historyCount, latestWhalezId } = props;

  if (!latestWhalezId) return null;

  const startAtZero = BigNumber.from(latestWhalezId).sub(historyCount).lt(0);

  let whaleIds: Array<BigNumber | null> = new Array(historyCount);
  whaleIds = whaleIds.fill(null).map((_, i) => {
    if (BigNumber.from(i).lt(latestWhalezId)) {
      const index = startAtZero
        ? BigNumber.from(0)
        : BigNumber.from(Number(latestWhalezId) - historyCount);
      return index.add(i);
    } else {
      return null;
    }
  });

  const whalezsContent = whaleIds.map((whaleId, i) => {
    return !whaleId ? <LoadingWhalez key={i} /> : <StandaloneWhalez key={i} whaleId={whaleId} />;
  });

  return (
    <Section fullWidth={true}>
      <Container fluid>
        <Row className="justify-content-md-center">
          <div className={clsx(classes.historyCollection)}>
            {config.app.enableHistory && whalezsContent}
          </div>
        </Row>
      </Container>
    </Section>
  );
};

export default HistoryCollection;
