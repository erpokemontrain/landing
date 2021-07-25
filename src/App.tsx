import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';
import styled from 'styled-components';
import Particles, { Type } from 'react-tsparticles';

import BanksProvider from './contexts/Banks';
import StandardProtocolProvider from './contexts/StandardProtocolProvider';
import ModalsProvider from './contexts/Modals';

import Banks from './views/Banks';
import Home from './views/Home';
import Rail from './views/Rail';

import store from './state';
import theme from './theme';
import config from './config';
import Updaters from './state/Updaters';
import Popups from './components/Popups';
import stnd from './assets/img/stnd.png';
import eth from './assets/img/eth.png';

const App: React.FC = () => {
  return (
    <Providers>
      <Rail />
      <Router>
        <Switch>
          {/* <Route path="/bank">
            <Banks />
          </Route> */}
          <Route path="/">
            <Banks />
          </Route>
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <StandardProtocolProvider>
            <ModalsProvider>
              <BanksProvider>
                <>
                  <Popups />
                  {children}
                </>
              </BanksProvider>
            </ModalsProvider>
          </StandardProtocolProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
