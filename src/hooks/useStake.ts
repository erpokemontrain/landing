import { useCallback } from 'react';
import useStandardProtocol from './useStandardProtocol';
import { Bank } from '../StandardProtocol';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const standardProtocol = useStandardProtocol();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        standardProtocol.stake(bank.contract, amountBn),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, standardProtocol],
  );
  return { onStake: handleStake };
};

export default useStake;
