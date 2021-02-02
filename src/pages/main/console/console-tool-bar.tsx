import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Checkbox, Divider, makeStyles, Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0 8px',
    },
  };
});

const ConsoleToolBar = React.memo(
  () => {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className={styles.topBar}>
        <DeleteForeverIcon />

        <div style={{ flexGrow: 1 }} />

        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}
          onClick={handleClick}
        >
          Default levels <ArrowDropDownIcon style={{ marginLeft: 16 }} />
        </div>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem style={{ width: 240, height: 40 }} onClick={handleClose}>
            Default
          </MenuItem>
          <Divider style={{ margin: '8px 0' }} />
          <MenuItem onClick={handleClose}>
            <Checkbox style={{ padding: 4 }} size={'small'} color="primary" /> Debug
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Checkbox style={{ padding: 4 }} size={'small'} color="primary" /> Info
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Checkbox style={{ padding: 4 }} size={'small'} color="primary" /> Warn
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Checkbox style={{ padding: 4 }} size={'small'} color="primary" /> Error
          </MenuItem>
        </Menu>
      </div>
    );
  },
  () => true
);

export default ConsoleToolBar;
