import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import StandardProtocol from '../../StandardProtocol';
import config from '../../config';

export interface StandardProtocolContext {
  standardProtocol?: StandardProtocol;
}

export const Context = createContext<StandardProtocolContext>({ standardProtocol: null });

export const StandardProtocolProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [standardProtocol, setStandardProtocol] = useState<StandardProtocol>();

  useEffect(() => {
    if (!standardProtocol) {
      const stadnardProtocol = new StandardProtocol(config);
      if (account) {
        // wallet was unlocked at initialization
        stadnardProtocol.unlockWallet(ethereum, account);
      }
      setStandardProtocol(stadnardProtocol);
    } else if (account) {
      standardProtocol.unlockWallet(ethereum, account);
    }
  }, [account]);

  return <Context.Provider value={{ standardProtocol }}>{children}</Context.Provider>;
};
