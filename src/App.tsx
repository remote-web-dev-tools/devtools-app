import React, { createContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import { useConfigure } from './hooks/configure.hook';
import { ConfigureInterface } from './interfaces/configure.interface';

import Configure from './pages/configure/configure';
import Home from './pages/home/home';

export const configureContext = createContext<{
  configure: ConfigureInterface;
  saveConfigure: (configure: ConfigureInterface) => void;
}>({ configure: { host: '' }, saveConfigure: () => {} });

function App() {
  const { needConfigure, saveConfigure, configure } = useConfigure();

  console.log(needConfigure);

  return (
    <configureContext.Provider value={{ saveConfigure, configure }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {needConfigure ? <Redirect to="/configure" /> : <Home />}
          </Route>
          <Route path="/configure">
            <Configure />
          </Route>
        </Switch>
      </Router>
    </configureContext.Provider>
  );
}

export default App;
