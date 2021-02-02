import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Box, makeStyles, Switch, Typography, withStyles } from '@material-ui/core';
import { LoggerLevel } from '@rwdt/logger';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export type SupportLoggerLevel = Exclude<LoggerLevel, 'ALL' | 'OFF'>;

export interface ConsoleFilter {
  showLogLevel: SupportLoggerLevel[];
  showTimestamps: boolean;
}

export interface ConsoleToolBarProps {
  filter: ConsoleFilter;
  onClear: () => void;
  onChangeFilter: (filter: ConsoleFilter) => void;
}

const useStyles = makeStyles(() => {
  return {
    topBar: {
      height: 32,
      fontSize: 12,
      padding: '0 8px',
    },
    divider: {
      width: 1,
      height: 16,
      backgroundColor: '#a3a3a3',
      margin: '0 8px',
    },
  };
});

const StyledToggleButton = withStyles({
  root: {
    fontSize: 'inherit',
    lineHeight: 1,
  },
})(ToggleButton);

const ConsoleToolBar = (props: ConsoleToolBarProps) => {
  const styles = useStyles();
  const { filter, onChangeFilter, onClear } = props;

  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} className={styles.topBar}>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Typography style={{ marginRight: 8 }}>Show Timestamps</Typography>
        <Switch
          checked={filter.showTimestamps}
          onChange={(event, checked) => {
            onChangeFilter({
              ...filter,
              showTimestamps: checked,
            });
          }}
          size={'small'}
        />
      </Box>
      <div className={styles.divider} />
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} flexGrow={1}>
        <Typography style={{ marginRight: 8, marginLeft: 4 }}>Select logger level</Typography>

        <ToggleButtonGroup
          size={'small'}
          value={filter.showLogLevel}
          onChange={(event, showLogLevel) => {
            onChangeFilter({
              ...filter,
              showLogLevel,
            });
          }}
        >
          <StyledToggleButton value={'DEBUG'}>debug</StyledToggleButton>
          <StyledToggleButton value={'INFO'}>info</StyledToggleButton>
          <StyledToggleButton value={'WARN'}>warn</StyledToggleButton>
          <StyledToggleButton value={'ERROR'}>error</StyledToggleButton>
        </ToggleButtonGroup>
      </Box>
      <DeleteForeverIcon style={{ cursor: 'pointer' }} onClick={onClear} />
    </Box>
  );
};

export default ConsoleToolBar;
