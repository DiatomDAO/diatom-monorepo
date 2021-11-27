import { BigNumber } from 'ethers';
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import StandaloneNoun from '../../components/StandaloneNoun';
import { useAppSelector } from '../../hooks';

import classes from './Profile.module.css';

import NounInfoCard from '../../components/NounInfoCard';
import ProfileActivityFeed from '../../components/ProfileActivityFeed';

interface ProfilePageProps {
  whaleId: number;
}

const ProfilePage: React.FC<ProfilePageProps> = props => {
  const { whaleId } = props;

  const lastAuctionNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);
  let stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);

  if (!lastAuctionNounId) {
    return <></>;
  }

  const whaleIdForDisplay = Math.min(whaleId, lastAuctionNounId);

  const nounContent = (
    <StandaloneNoun
      whaleId={BigNumber.from(whaleIdForDisplay)}
    />
  );

  return (
    <>
      <div style={{ backgroundColor: stateBgColor }}>
        <Container>
          <Row>
            <Col lg={6}>{nounContent}</Col>
            <Col lg={6} className={classes.nounProfileInfo}>
              <NounInfoCard whaleId={whaleIdForDisplay} />
            </Col>
          </Row>
        </Container>
      </div>
      <ProfileActivityFeed whaleId={whaleIdForDisplay} />
    </>
  );
};

export default ProfilePage;
