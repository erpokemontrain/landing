import React from 'react';
import styled from 'styled-components';

import stndLogo from '../../assets/img/stnd.png';
import stndEth from '../../assets/img/stndeth.png';

import ethLogo from '../../assets/img/eth.png';
import USDTLogo from '../../assets/img/USDT.png';

const logosBySymbol: { [title: string]: string } = {
  STND: stndLogo,
  ETH: ethLogo,
  USDT: USDTLogo,
  'STND_ETH-UNI-LPv2': stndEth,
};

type STNTLogoProps = {
  className?: string;
  symbol: string;
  size?: number;
  width?: number;
  height?: number;
};

const TokenSymbol: React.FC<STNTLogoProps> = ({
  className,
  width,
  height,
  symbol,
  size = 64,
}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid STND Logo symbol: ${symbol}`);
  }
  return (
    <img
      className={`${className}`}
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={width || size}
      height={height || size}
    />
  );
};

export default styled(TokenSymbol)`
  width: auto;
`;
