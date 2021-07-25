import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useStandardProtocol from './useStandardProtocol';
import { ContractName } from '../StandardProtocol';
import config from '../config';

const useEarnings = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const standardProtocol = useStandardProtocol();

  const fetchBalance = useCallback(async () => {
    const balance = await standardProtocol.earnedFromBank(poolName, standardProtocol.myAccount);
    setBalance(balance);
  }, [standardProtocol?.isUnlocked, poolName]);

  useEffect(() => {
    if (standardProtocol?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [standardProtocol?.isUnlocked, poolName, standardProtocol]);

  return balance;
};

export default useEarnings;
