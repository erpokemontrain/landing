import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useStandardProtocol from '../../hooks/useStandardProtocol';

function TVL(props) {
  const [prices, setPrices] = useState(null);
  const standardProtocol = useStandardProtocol();

  const fetchPrices = async () => {
    const _prices = await standardProtocol.getLPBalance();
    if (_prices !== null) {
      setPrices(_prices);
    }
  };

  const numberWithCommas = (x) => {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    standardProtocol && fetchPrices();
  }, [standardProtocol]);

  return (
    prices !== null && (
      <div className={`${props.className}`}>
        <p>
          <strong>Total Uniswap Liquidity:</strong>

          <span> ${numberWithCommas(prices[0].toFixed(2))}</span>
        </p>
        <p>
          <strong>Staked Liquidity:</strong>

          <span> ${numberWithCommas(prices[1].toFixed(2))}</span>
        </p>
        <p>
          <strong>Price:</strong> <span> ${numberWithCommas(prices[2].toFixed(2))}</span>
        </p>
        <p>
          <strong>APR:</strong>{' '}
          <span style={{ color: '#64ffda' }}>
            {numberWithCommas(((((300000 / 2) * prices[2]) / prices[1]) * 12 * 100).toFixed(2))}
            %
          </span>
        </p>
      </div>
    )
  );
}

export default styled(TVL)`
  p {
    margin-top: 0;
    strong {
      font-size: 16px;
      font-weight: 700;
    }
  }

  span {
    color: #9090ff;
    padding-top: 16px;
    font-size: 16px;
  }
  // padding: 20px;
  width: 100%;
  height: 100%;
  color: #fff;
  margin-bottom: 42px;
  text-align: center;
  // margin-top: 34px;

  // box-sizing: border-box;
  // background: rgba(255, 255, 255, 0.025);
  // // background: rgba(203, 51, 143, 0.25);
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  // backdrop-filter: blur(4px);
  // -webkit-backdrop-filter: blur(4px);
  // border-radius: 10px;
  // border: 1px solid rgba(255, 255, 255, 0.25);
`;
