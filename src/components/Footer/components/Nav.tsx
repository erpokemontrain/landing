import React from 'react';
import styled from 'styled-components';

import discord from '../../../assets/img/footer/discord.png';
import twitter from '../../../assets/img/footer/twitter.png';
import telegram from '../../../assets/img/footer/telegram.png';
import github from '../../../assets/img/footer/github.png';
import medium from '../../../assets/img/footer/medium.png';
import wtpgate from '../../../assets/img/footer/wtpgate.png';
import wtpku from '../../../assets/img/footer/wtpku.png';
import uni from '../../../assets/img/footer/uni.png';
import coinone from '../../../assets/img/footer/coinone.png';

const Nav: React.FC = () => {
  return (
    <StyledNavCont>
      <StyledNav>
        <StyledLink
          href="https://v2.info.uniswap.org/pair/0xe94272661fd46362e5dd247221e0fc018a298d09"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={uni} alt="uniswap" />
        </StyledLink>
        <StyledLink
          href="https://www.gate.io/trade/stnd_usdt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={wtpgate} alt="gate" />
        </StyledLink>
        <StyledLink
          href="https://trade.kucoin.com/STND-USDT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={wtpku} alt="kucoin" style={{ width: '38px', height: '38px' }} />
        </StyledLink>
        <StyledLink
          href="https://coinone.co.kr/exchange/trade/stnd/krw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={coinone} alt="coinone" style={{ width: '38px', height: '38px' }} />
        </StyledLink>
      </StyledNav>
      <StyledNav>
        <StyledLink
          href="https://github.com/digitalnativeinc"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </StyledLink>
        <StyledLink
          href="https://twitter.com/standarddefi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </StyledLink>
        <StyledLink
          href="https://t.me/standard_protocol"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </StyledLink>
        <StyledLink
          href="https://discord.gg/BkcE8kR9B9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </StyledLink>
        <StyledLink
          href="https://blog.standard.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </StyledLink>
        <StyledLink href="https://standard.tech" target="_blank">
          Website
        </StyledLink>
      </StyledNav>
    </StyledNavCont>
  );
};

const StyledNavCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledNav = styled.nav`
  margin-bottom: 12px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  margin-bottom: 24px;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }

  img {
    width: 44px;
    height: 44px;
  }
`;
export default Nav;
