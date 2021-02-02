import React from 'react';

import { AppBar, Button, makeStyles, Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { useClientIds } from './main.hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Router } from '@material-ui/icons';
import Configure from '../configure/configure';
import { configureContext } from '../../App';
import Console from './console/console';

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
  },
});

const routes = [
  {
    path: '/console',
    tabTitle: 'console',
    disabled: false,
    component: Console,
  },
];

const Main = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const { serverId, clientIds, selectedClientId, setSelectedClientId } = useClientIds();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.main}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Remote Dev Tools
          </Typography>

          <Button aria-haspopup="true" size={'large'} onClick={handleClick} style={{ color: '#fff' }}>
            {selectedClientId ? (
              <>
                {selectedClientId} <ArrowDropDownIcon style={{ marginLeft: 8 }} />
              </>
            ) : (
              'No Client'
            )}
          </Button>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {clientIds.map((value, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  setSelectedClientId(value);
                  handleClose();
                }}
              >
                {value}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <Tabs value={tabIndex} textColor="primary" onChange={handleChangeTab}>
          {routes.map((route) => (
            <Tab label={route.tabTitle.toUpperCase()} disabled={route.disabled} />
          ))}
        </Tabs>

        <Switch>
          <Router>
            <Switch>
              {routes.map((route) => (
                <Route path={'/main' + route.path} component={route.component} />
              ))}
            </Switch>
          </Router>
        </Switch>
      </div>
    </div>
  );
};

export default Main;
