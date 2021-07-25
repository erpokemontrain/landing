import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useStandardProtocol from '../../hooks/useStandardProtocol';
import config from '../../config';
import Notice from '../../components/Notice';

const Home: React.FC = () => {
  const standardProtocol = useStandardProtocol();

  const [{ stnd }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [stnd] = await Promise.all([standardProtocol.getStndStatFromUniswap()]);
    setStats({ stnd });
  }, [standardProtocol, setStats]);

  useEffect(() => {
    if (standardProtocol) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [standardProtocol]);

  const stndAddr = useMemo(() => standardProtocol?.STND.address, [standardProtocol]);

  return (
    <Page>
      <PageHeader
        icon="👋"
        subtitle="Provide Liquidity and Earn STND"
        title="Welcome to Standard Protocol"
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="Standard Protocol"
          symbol="STND"
          color="#EEA7ED"
          supplyLabel="Circulating Supply"
          address={stndAddr}
          stat={stnd}
        />
        <Spacer size="lg" />
      </CardWrapper>
    </Page>
  );
};

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledNoticeContainer = styled.div`
  max-width: 768px;
  width: 90vw;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

export default Home;
