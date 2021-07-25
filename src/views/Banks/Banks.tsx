import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Bank from '../Bank';
import BankCards from './BankCards';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import safe from '../../assets/img/safe.png';
import TVL from './TVL';
// import Ticket from ''

import useStandardProtocol from '../../hooks/useStandardProtocol';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  const standardProtocol = useStandardProtocol();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            title={`Move Your Assets and Take A Chance To Earn`}
            subtitle="Get Your Ticket, Now"
          />
          {!!account ? (
            <Explain>FEATURES ARE COMING</Explain>
          ) : (
            <div className="sliding-box" onClick={() => connect('injected')}>
              <div className="sliding-box-inner">Unlock Wallet</div>
            </div>
          )}
        </Route>
      </Page>
    </Switch>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  // justify-content: center;
`;

const Explain = styled.div`
  color: #f14241;
  font-size: 48px;
  font-weight: bold;
`;

export default Banks;
