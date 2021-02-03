import React, { createContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import { useConfigure } from './pages/configure/configure.hook';
import { ConfigureInterface } from '@interfaces/configure.interface';

import Configure from './pages/configure/configure';
import Main from './pages/main/main';

export const ConfigContext = createContext<{
  configure: ConfigureInterface;
  saveConfigure: (configure: Required<ConfigureInterface>) => void;
}>({
  configure: { transferServerUrl: '' },
  saveConfigure: () => {},
});

function App() {
  const { needConfigure, saveConfigure, configure } = useConfigure();

  return (
    <ConfigContext.Provider value={{ saveConfigure, configure }}>
      <Router>
        <Switch>
          <Route path="/main">{needConfigure ? <Redirect to="/configure" /> : <Main />}</Route>
          <Route path="/configure" exact>
            <Configure />
          </Route>
          <Route path="/" exact>
            <Redirect to="/main" />
          </Route>
        </Switch>
      </Router>
    </ConfigContext.Provider>
  );
}

export default App;
