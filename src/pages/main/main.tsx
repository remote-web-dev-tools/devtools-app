import { AppBar, Button, makeStyles, Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Console from './console/console';
import EventTracking from './event-tracking/event-tracking';
import Network from './network/network';

import { useClientIds } from './main.hooks';

const useStyles = makeStyles({
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
});

const routes = [
  {
    path: '/console',
    tabTitle: 'console',
    disabled: false,
    component: Console,
  },
  {
    path: '/network',
    tabTitle: 'network',
    disabled: true,
    component: Network,
  },
  {
    path: '/event-tracking',
    tabTitle: 'Event Tracking',
    disabled: true,
    component: EventTracking,
  },
];

const Main = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const { serverId, clientIds, selectedClientId, setSelectedClientId } = useClientIds();

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
            aria-haspopup="true"
            size={'large'}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setAnchorEl(event.currentTarget);
            }}
            style={{ color: '#fff' }}
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
          {routes.map(({ component, path: componentPath }, index) => (
            <Route key={index} exact path={`${path}${componentPath}`} component={component} />
          ))}
        </Switch>
      </div>
    </div>
  );
};

export default Main;
