import { useCallback } from 'react';
import useStandardProtocol from './useStandardProtocol';
import { Bank } from '../StandardProtocol';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useWithdraw = (bank: Bank) => {
  const standardProtocol = useStandardProtocol();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        standardProtocol.unstake(bank.contract, amountBn),
        `Withdraw ${amount} ${bank.depositTokenName} from ${bank.contract}`,
      );
    },
    [bank, standardProtocol],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
