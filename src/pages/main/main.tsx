import { AppBar, IconButton, makeStyles, Snackbar, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Console from './console/console';
import EventTracking from './event-tracking/event-tracking';
import Network from './network/network';

import { useFetchData } from './main.hooks';
import { ConfigContext } from '@app/App';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => {
  return {
    main: {
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      display: 'flex',
      paddingTop: 64,
    },
    title: {
      flexGrow: 1,
    },
    container: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
    },
  };
});

const routes = [
  {
    path: '/console',
    tabTitle: 'console',
    disabled: false,
  },
  {
    path: '/network',
    tabTitle: 'network',
    disabled: true,
  },
  {
    path: '/event-tracking',
    tabTitle: 'Event Tracking',
    disabled: true,
  },
];

const Main = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const {
    configure: { clientId },
  } = useContext(ConfigContext);

  const { logs, clearLogs } = useFetchData(clientId);

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className={classes.main}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Remote Dev Tools
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => {
              history.push('/configure');
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Tabs
          value={tabIndex}
          textColor="primary"
          indicatorColor={'primary'}
          onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
            setTabIndex(newValue);
          }}
        >
          {routes.map(({ disabled, path: componentPath, tabTitle }, index) => (
            <Tab
              key={index}
              component={'a'}
              onClick={(event) => {
                event.preventDefault();
                history.push(`${url}${componentPath}`);
              }}
              label={tabTitle.toUpperCase()}
              disabled={disabled}
            />
          ))}
        </Tabs>

        <Switch>
          <Route exact path={path}>
            <Redirect to={`${path}/console`} />
          </Route>

          {/* Console panel */}
          <Route exact path={`${path}/console`}>
            <Console logs={logs} onClear={clearLogs} />
          </Route>

          {/* Network panel */}
          <Route exact path={`${path}/network`}>
            <Network />
          </Route>

          {/* EventTracking panel */}
          <Route exact path={`${path}/event-tracking`}>
            <EventTracking />
          </Route>
        </Switch>
      </div>
      <Snackbar open={!clientId} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Please set <strong>client id!</strong>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
