import { useCallback } from 'react';
import useStandardProtocol from './useStandardProtocol';
import { Bank } from '../StandardProtocol';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const standardProtocol = useStandardProtocol();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(standardProtocol.exit(bank.contract), `Redeem ${bank.contract}`);
  }, [bank, standardProtocol]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
