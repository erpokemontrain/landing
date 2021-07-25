import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useStandardProtocol from '../../hooks/useStandardProtocol';
import { Bank } from '../../StandardProtocol';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const standardProtocol = useStandardProtocol();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!standardProtocol.isUnlocked) continue;

        // only show pools staked by user
        const balance = await standardProtocol.stakedBalanceOnBank(
          bankInfo.contract,
          standardProtocol.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: standardProtocol.externalTokens[bankInfo.depositTokenName],
        earnToken: standardProtocol.STND,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [standardProtocol, standardProtocol?.isUnlocked, setBanks]);

  useEffect(() => {
    if (standardProtocol) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [standardProtocol, standardProtocol?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
