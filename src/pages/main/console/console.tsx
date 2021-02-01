import React from 'react';
import JsValueView from '@rwdt/js-value-view';
import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Log } from '../../../interfaces/log.interface';
import { Divider } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

export interface ConsoleProps {
  logs: Log[];
  onClear: () => void;
}

const useStyles = makeStyles({
  line: {
    display: 'flex',
    flexDirection: 'row',
    padding: '8px 0',
    borderBottom: '1px solid #ededed',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 8px',
  },
});

const Line = React.memo(
  ({ log }: { log: Log }) => {
    const styles = useStyles();

    return (
      <div className={styles.line}>
        {log.data.map((value, index) => (
          <React.Fragment key={index}>
            <JsValueView value={value} />
            <div style={{ width: 8 }} />
          </React.Fragment>
        ))}
      </div>
    );
  },
  () => true
);

const TopBar = React.memo(
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

const Console = React.memo(
  (props: ConsoleProps) => {
    const { logs, onClear } = props;

    return (
      <div
        style={{
          height: '100%',
          paddingTop: 8,
        }}
      >
        <TopBar />

        {logs.map((log) => (
          <Line log={log} key={log.key} />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.logs === nextProps.logs
);

export default Console;
