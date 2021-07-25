import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../StandardProtocol';
import safe from '../../assets/img/safe.png';
import Countdown from './BankCountdown';
import TVL from '../Banks/TVL';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams();

  const bank = useBank(bankId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);

  const countdown = () => {
    if (bankId === 'STNDETHLPTokenSharePool')
      return (
        <StyledCountDownHeaderDiv>
          <StyledCountDownHeader>Ends In</StyledCountDownHeader>
          <Countdown date={new Date(1627371000 * 1000)} />
        </StyledCountDownHeaderDiv>
      );
  };

  const StyledCountDownHeaderDiv = styled.div`
    padding: 32px 0;
  `;

  const StyledCountDownHeader = styled.p`
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 24px;
    color: #fff;
    text-align: center;
    animation fadein 1.5s forwards;
  `;

  return account && bank ? (
    <>
      <PageHeader
        img={safe}
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <TVL />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest bank={bank} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake bank={bank} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
        <Spacer size="lg" />
        <div>
          <Button onClick={onRedeem} text="Harvest & Withdraw" />
        </div>
        <Spacer size="lg" />
      </StyledBank>
      {countdown()}
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <>
      <PageHeader
        img={safe}
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <UnlockWallet />
    </>
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let uniswapUrl: string;
  pairName = 'STND-ETH pair';
  uniswapUrl =
    'https://app.uniswap.org/#/add/v2/0x9040e237c3bf18347bb00957dc22167d0f2b999d/ETH';

  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {`🦄  Provide liquidity to ${pairName} on Uniswap  🦄`}
    </StyledLink>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon="🏚"
        title="Not Found"
        subtitle="You've hit a bank just robbed by unicorns."
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <div className="sliding-box" onClick={() => connect('injected')}>
        <div className="sliding-box-inner">Unlock Wallet</div>
      </div>
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }

  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.025);
  // background: rgba(203, 51, 143, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
