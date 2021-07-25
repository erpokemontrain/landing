import React from 'react';
import styled from 'styled-components';

import Nav from './components/Nav';

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledFooterInner>
      <Nav />
    </StyledFooterInner>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  flex: 1 1 0;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${(props) => props.theme.topBarSize}px;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`;

export default Footer;
