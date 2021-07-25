import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../StandardProtocol/ERC20';
import useStandardProtocol from './useStandardProtocol';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const standardProtocol = useStandardProtocol();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(standardProtocol.myAccount));
  }, [standardProtocol?.isUnlocked, token]);

  useEffect(() => {
    if (standardProtocol?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [standardProtocol?.isUnlocked, token]);

  return balance;
};

export default useTokenBalance;
