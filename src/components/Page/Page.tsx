import React from 'react';
import styled from 'styled-components';

import Footer from '../Footer';
import TopBar from '../TopBar';

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <TopBar />
    <StyledMain>{children}</StyledMain>
  </StyledPage>
);

const StyledPage = styled.div`
  width: 100%;
  min-height: 100vh;
  // padding-bottom: 100px;
  flex-direction: column;
  display: flex;
  // justify-content: center;
  align-items: center;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledMain = styled.div`
  flex: 2 1 0;
  margin-bottom: 36px;
  box-sizing: border-box;
  align-items: center;
  // justify-content: center;
  display: inline-flex;
  flex-direction: column;
  // min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  padding-bottom: ${(props) => props.theme.spacing[5]}px;
`;

export default Page;
