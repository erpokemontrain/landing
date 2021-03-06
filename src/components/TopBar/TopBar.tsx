import React from 'react';
import styled from 'styled-components';

import Container from '../Container';
import Logo from '../Logo';

import AccountButton from './components/AccountButton';
import Nav from './components/Nav';
import TxButton from './components/TxButton';

const TopBar: React.FC = () => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <div style={{ flex: 1 }}>
            <Logo />
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <TxButton />
          </div>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  );
};

const StyledTopBar = styled.div`
  width: 100%;
`;

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  flex-wrap: wrap;
`;

export default TopBar;
