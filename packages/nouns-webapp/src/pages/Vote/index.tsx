import { Row, Col, Alert, Button, Card, ProgressBar, Spinner } from 'react-bootstrap';
import Section from '../../layout/Section';
import {
  ProposalState,
  useCastVote,
  useExecuteProposal,
  useProposal,
  useQueueProposal,
  Vote,
} from '../../wrappers/nounsDao';
import { useUserVotesAsOfBlock } from '../../wrappers/nounToken';
import classes from './Vote.module.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { TransactionStatus, useBlockNumber } from '@usedapp/core';
import { buildEtherscanAddressLink, buildEtherscanTxLink } from '../../utils/etherscan';
import { AlertModal, setAlertModal } from '../../state/slices/application';
import ProposalStatus from '../../components/ProposalStatus';
import moment from 'moment-timezone';
import VoteModal from '../../components/VoteModal';
import { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { utils } from 'ethers';
import { useAppDispatch } from '../../hooks';

const AVERAGE_BLOCK_TIME_IN_SECS = 13;

const VotePage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const proposal = useProposal(id);

  const [vote, setVote] = useState<Vote>();

  const [showVoteModal, setShowVoteModal] = useState<boolean>(false);
  const [isVotePending, setVotePending] = useState<boolean>(false);

  const [isQueuePending, setQueuePending] = useState<boolean>(false);
  const [isExecutePending, setExecutePending] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const setModal = useCallback((modal: AlertModal) => dispatch(setAlertModal(modal)), [dispatch]);

  const { castVote, castVoteState } = useCastVote();
  const { queueProposal, queueProposalState } = useQueueProposal();
  const { executeProposal, executeProposalState } = useExecuteProposal();

  // Get and format date from data
  const timestamp = Date.now();
  const currentBlock = useBlockNumber();
  const startDate =
    proposal && timestamp && currentBlock
      ? moment(timestamp).add(
          AVERAGE_BLOCK_TIME_IN_SECS * (proposal.startBlock - currentBlock),
          'seconds',
        )
      : undefined;

  const endDate =
    proposal && timestamp && currentBlock
      ? moment(timestamp).add(
          AVERAGE_BLOCK_TIME_IN_SECS * (proposal.endBlock - currentBlock),
          'seconds',
        )
      : undefined;
  const timezone = moment.tz(moment.tz.guess()).zoneAbbr();
  const now = moment();

  // Get total votes and format percentages for UI
  const totalVotes = proposal
    ? proposal.forCount + proposal.againstCount + proposal.abstainCount
    : undefined;
  const forPercentage = proposal && totalVotes ? (proposal.forCount * 100) / totalVotes : 0;
  const againstPercentage = proposal && totalVotes ? (proposal.againstCount * 100) / totalVotes : 0;
  const abstainPercentage = proposal && totalVotes ? (proposal.abstainCount * 100) / totalVotes : 0;

  // Only count available votes as of the proposal created block
  const availableVotes = useUserVotesAsOfBlock(proposal?.createdBlock ?? undefined);

  // Only show voting if user has > 0 votes at proposal created block and proposal is active
  const showVotingButtons = availableVotes && proposal?.status === ProposalState.ACTIVE;

  const linkIfAddress = (content: string) => {
    if (utils.isAddress(content)) {
      return (
        <a href={buildEtherscanAddressLink(content)} target="_blank" rel="noreferrer">
          {content}
        </a>
      );
    }
    return <span>{content}</span>;
  };

  const transactionLink = (content: string) => {
    return (
      <a href={buildEtherscanTxLink(content)} target="_blank" rel="noreferrer">
        {content.substring(0, 7)}
      </a>
    );
  };

  const getVoteErrorMessage = (error: string | undefined) => {
    if (error?.match(/voter already voted/)) {
      return 'User Already Voted';
    }
    return error;
  };

  const isAwaitingStateChange = () => {
    return [ProposalState.SUCCEEDED, ProposalState.QUEUED].includes(proposal?.status ?? -1);
  };

  const { forCount = 0, againstCount = 0, quorumVotes = 0 } = proposal || {};
  const quorumReached = forCount > againstCount && forCount >= quorumVotes;

  const isSucceededState = proposal?.status === ProposalState.SUCCEEDED;
  const moveStateTitle = isSucceededState ? 'Queue' : 'Execute';
  const moveStateAction = (() => {
    if (isSucceededState) {
      return () => queueProposal(proposal?.id);
    }
    return () => executeProposal(proposal?.id);
  })();

  const onTransactionStateChange = useCallback(
    (
      tx: TransactionStatus,
      successMessage?: string,
      setPending?: (isPending: boolean) => void,
      getErrorMessage?: (error?: string) => string | undefined,
      onFinalState?: () => void,
    ) => {
      switch (tx.status) {
        case 'None':
          setPending?.(false);
          break;
        case 'Mining':
          setPending?.(true);
          break;
        case 'Success':
          setModal({
            title: 'Success',
            message: successMessage || 'Transaction Successful!',
            show: true,
          });
          setPending?.(false);
          onFinalState?.();
          break;
        case 'Fail':
          setModal({
            title: 'Transaction Failed',
            message: tx?.errorMessage || 'Please try again.',
            show: true,
          });
          setPending?.(false);
          onFinalState?.();
          break;
        case 'Exception':
          setModal({
            title: 'Error',
            message: getErrorMessage?.(tx?.errorMessage) || 'Please try again.',
            show: true,
          });
          setPending?.(false);
          onFinalState?.();
          break;
      }
    },
    [setModal],
  );

  useEffect(
    () =>
      onTransactionStateChange(
        castVoteState,
        'Vote Successful!',
        setVotePending,
        getVoteErrorMessage,
        () => setShowVoteModal(false),
      ),
    [castVoteState, onTransactionStateChange, setModal],
  );

  useEffect(
    () => onTransactionStateChange(queueProposalState, 'Proposal Queued!', setQueuePending),
    [queueProposalState, onTransactionStateChange, setModal],
  );

  useEffect(
    () => onTransactionStateChange(executeProposalState, 'Proposal Executed!', setExecutePending),
    [executeProposalState, onTransactionStateChange, setModal],
  );

  return (
    <Section bgColor="transparent" fullWidth={false} className={classes.votePage}>
      <VoteModal
        show={showVoteModal}
        onHide={() => setShowVoteModal(false)}
        onVote={() => castVote(proposal?.id, vote)}
        isLoading={isVotePending}
        proposalId={proposal?.id}
        availableVotes={availableVotes}
        vote={vote}
      />
      <Col lg={{ span: 8, offset: 2 }}>
        <Link to="/vote">← All Proposals</Link>
      </Col>
      <Col lg={{ span: 8, offset: 2 }} className={classes.proposal}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className={classes.proposalId}>Proposal {proposal?.id}</h3>
          <ProposalStatus status={proposal?.status}></ProposalStatus>
        </div>
        <div>
          {startDate && startDate.isBefore(now) ? null : proposal ? (
            <span>
              Voting starts approximately {startDate?.format('LLL')} {timezone}
            </span>
          ) : (
            ''
          )}
        </div>
        <div>
          {endDate && endDate.isBefore(now) ? (
            <>
              <div>
                Voting ended {endDate.format('LLL')} {timezone}
              </div>
              <div>
                This proposal has {quorumReached ? 'reached' : 'failed to reach'} quorum{' '}
                {proposal?.quorumVotes !== undefined && `(${proposal.quorumVotes} votes)`}
              </div>
            </>
          ) : proposal ? (
            <>
              <div>
                Voting ends approximately {endDate?.format('LLL')} {timezone}
              </div>
              {proposal?.quorumVotes !== undefined && (
                <div>A total of {proposal.quorumVotes} votes are required to reach quorum</div>
              )}
            </>
          ) : (
            ''
          )}
        </div>
        {proposal && proposal.status === ProposalState.ACTIVE && !showVotingButtons && (
          <Alert variant="secondary" className={classes.voterIneligibleAlert}>
            Only NOUN votes that were self delegated or delegated to another address before block{' '}
            {proposal.createdBlock} are eligible for voting.
          </Alert>
        )}
        {showVotingButtons ? (
          <Row>
            <Col lg={4}>
              <Button
                className={classes.votingButton}
                onClick={() => {
                  setVote(Vote.FOR);
                  setShowVoteModal(true);
                }}
                block
              >
                Vote For
              </Button>
            </Col>
            <Col lg={4}>
              <Button
                className={classes.votingButton}
                onClick={() => {
                  setVote(Vote.AGAINST);
                  setShowVoteModal(true);
                }}
                block
              >
                Vote Against
              </Button>
            </Col>
            <Col lg={4}>
              <Button
                className={classes.votingButton}
                onClick={() => {
                  setVote(Vote.ABSTAIN);
                  setShowVoteModal(true);
                }}
                block
              >
                Abstain
              </Button>
            </Col>
          </Row>
        ) : (
          ''
        )}
        {isAwaitingStateChange() && (
          <Row className={classes.section}>
            <Col>
              <Button
                onClick={moveStateAction}
                disabled={isQueuePending || isExecutePending}
                variant="dark"
                block
              >
                {isQueuePending || isExecutePending ? (
                  <Spinner animation="border" />
                ) : (
                  moveStateTitle
                )}
              </Button>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={4}>
            <Card className={classes.voteCountCard}>
              <Card.Body className="p-2">
                <Card.Text className="py-2 m-0">
                  <span>For</span>
                  <span>{proposal?.forCount}</span>
                </Card.Text>
                <ProgressBar variant="success" now={forPercentage} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className={classes.voteCountCard}>
              <Card.Body className="p-2">
                <Card.Text className="py-2 m-0">
                  <span>Against</span>
                  <span>{proposal?.againstCount}</span>
                </Card.Text>
                <ProgressBar variant="danger" now={againstPercentage} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className={classes.voteCountCard}>
              <Card.Body className="p-2">
                <Card.Text className="py-2 m-0">
                  <span>Abstain</span>
                  <span>{proposal?.abstainCount}</span>
                </Card.Text>
                <ProgressBar variant="info" now={abstainPercentage} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className={classes.section}>
            <h5>Description</h5>
            {proposal?.description && (
              <ReactMarkdown
                className={classes.markdown}
                children={proposal.description}
                remarkPlugins={[remarkBreaks]}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col className={classes.section}>
            <h5>Proposed Transactions</h5>
            {proposal?.details?.map((d, i) => {
              return (
                <p key={i} className="m-0">
                  {i + 1}: {linkIfAddress(d.target)}.{d.functionSig}(
                  {d.callData.split(',').map((content, i) => {
                    return (
                      <span key={i}>
                        {linkIfAddress(content)}
                        {d.callData.split(',').length - 1 === i ? '' : ','}
                      </span>
                    );
                  })}
                  )
                </p>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col className={classes.section}>
            <h5>Proposer</h5>
            {proposal?.proposer && proposal?.transactionHash && (
              <>
                {linkIfAddress(proposal.proposer)} at {transactionLink(proposal.transactionHash)}
              </>
            )}
          </Col>
        </Row>
      </Col>
    </Section>
  );
};

export default VotePage;
