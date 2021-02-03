import React from 'react';
import { Log } from '@interfaces/log.interface';
import dayjs from 'dayjs';
import JsValueView from '@rwdt/js-value-view';
import { makeStyles } from '@material-ui/core';
import { ConsoleFilter } from './console-tool-bar';

export interface ConsoleItemProps {
  log: Log;
  filter: ConsoleFilter;
}

const useStyles = makeStyles(({ palette }) => {
  return {
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      minHeight: 32,
      borderBottom: '1px solid #ededed',
    },
    logTime: {
      paddingTop: 8,
      width: 90,
      fontSize: 14,
      lineHeight: '16px',
      color: '#a3a3a3',
    },
    logLevel: {
      width: 60,
      margin: '0 8px',
      paddingTop: 6,
    },
    logLevelTag: {
      fontSize: 12,
      lineHeight: '16px',
      padding: '2px 4px',
      borderRadius: 4,
      textAlign: 'center',

      '&.error': {
        backgroundColor: palette.error.light,
        color: palette.error.contrastText,
      },
      '&.warn': {
        backgroundColor: palette.warning.light,
        color: palette.warning.contrastText,
      },
      '&.info': {
        backgroundColor: palette.info.light,
        color: palette.info.contrastText,
      },
      '&.debug': {
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #333',
      },
    },
    logData: {
      paddingTop: 8,

      '& > .index-module_valueView__tNVJp': {
        marginRight: 9,
      },
    },
  };
});

const ConsoleItem = React.memo(
  ({ log, filter: { showTimestamps } }: ConsoleItemProps) => {
    const styles = useStyles();

    return (
      <div className={styles.item}>
        {/* log date */}
        {showTimestamps ? (
          <div className={styles.logTime}>
            <span>{dayjs(log.date).format('HH:mm:ss.SSS')}</span>
          </div>
        ) : null}

        {/* logger level */}
        <div className={styles.logLevel}>
          <div className={`${styles.logLevelTag} ${log.level}`}>{log.level.toUpperCase()}</div>
        </div>

        {log.data.map((value, index) => (
          <div className={styles.logData} key={index}>
            <JsValueView value={value} />
          </div>
        ))}
      </div>
    );
  },
  (prev, next) => {
    const { filter: preFilter } = prev;
    const { filter: nextFilter } = next;

    return preFilter.showTimestamps === nextFilter.showTimestamps;
  }
);

export default ConsoleItem;
