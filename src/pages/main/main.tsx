import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Console from './console/console';
import EventTracking from './event-tracking/event-tracking';
import Network from './network/network';

import { useClientIds, useFetchData } from './main.hooks';

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

  const { serverId, clientIds, selectedClientId, setSelectedClientId } = useClientIds();
  const { logs, clearLogs } = useFetchData(serverId, selectedClientId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className={classes.main}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Remote Dev Tools
          </Typography>

          <Button
            disabled={clientIds.length === 0}
            style={{ color: '#fff' }}
            aria-haspopup="true"
            size={'large'}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {selectedClientId ? (
              <>
                {selectedClientId} <ArrowDropDownIcon style={{ marginLeft: 8 }} />
              </>
            ) : (
              'No Client'
            )}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            {clientIds.map((value, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  setSelectedClientId(value);
                  setAnchorEl(null);
                }}
              >
                {value}
              </MenuItem>
            ))}
          </Menu>

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
    </div>
  );
};

export default Main;
