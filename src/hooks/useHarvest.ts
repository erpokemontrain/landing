import { useCallback } from 'react';
import useStandardProtocol from './useStandardProtocol';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../StandardProtocol';

const useHarvest = (bank: Bank) => {
  const standardProtocol = useStandardProtocol();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      standardProtocol.harvest(bank.contract),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, standardProtocol]);

  return { onReward: handleReward };
};

export default useHarvest;
