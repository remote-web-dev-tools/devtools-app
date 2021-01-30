import React, { createContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import { useConfigure } from './pages/configure/configure.hook';
import { ConfigureInterface } from './interfaces/configure.interface';

import Configure from './pages/configure/configure';
import Main from './pages/main/main';

export const configureContext = createContext<{
  configure: ConfigureInterface;
  saveConfigure: (configure: ConfigureInterface) => void;
}>({ configure: { host: '' }, saveConfigure: () => {} });

function App() {
  const { needConfigure, saveConfigure, configure } = useConfigure();

  return (
    <configureContext.Provider value={{ saveConfigure, configure }}>
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
    </configureContext.Provider>
  );
}

export default App;
