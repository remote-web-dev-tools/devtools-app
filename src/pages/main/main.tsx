import React from 'react';

import { AppBar, Button, makeStyles, MenuItem, Toolbar, Typography } from '@material-ui/core';

import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useClientIds } from './main.hooks';

const useStyles = makeStyles({
  main: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
});

const Main = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
    </div>
  );
};

export default Main;
