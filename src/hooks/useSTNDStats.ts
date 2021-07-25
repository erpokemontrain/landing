import { useCallback, useEffect, useState } from 'react';
import useStandardProtocol from './useStandardProtocol';
import { TokenStat } from '../StandardProtocol/types';
import config from '../config';

const useSTNDStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const standardProtocol = useStandardProtocol();

  const fetchSTNDPrice = useCallback(async () => {
    setStat(await standardProtocol.getStndStatFromUniswap());
  }, [standardProtocol]);

  useEffect(() => {
    fetchSTNDPrice().catch((err) => console.error(`Failed to fetch BAB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchSTNDPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, standardProtocol]);

  return stat;
};

export default useSTNDStats;
