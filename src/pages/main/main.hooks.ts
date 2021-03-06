import React, { useEffect } from 'react';
import { ClientId } from '@interfaces/transfer-id.interface';
import { Log } from '@interfaces/log.interface';
import { fetchRemoteData } from './main.services';

const MAX_LOG_LENGTH = 5000;
let key_index = 1;

const appendData = <T, R = T & { key: number }>(preState: R[], nextState: T[]): R[] => {
  let newData: R[] = [...preState].concat(
    nextState.map((value: any) => {
      return {
        key: key_index++,
        ...value,
      };
    })
  );

  if (newData.length <= MAX_LOG_LENGTH) {
    return newData;
  } else {
    return newData.slice(newData.length - MAX_LOG_LENGTH, newData.length);
  }
};

export const useFetchData = (clientId: ClientId) => {
  const [logs, setLogs] = React.useState<Log[]>([]);

  const timerRef = React.useRef<NodeJS.Timeout>();

  const timeFn = React.useCallback(() => {
    fetchRemoteData(clientId)
      .then((loggingEvents) => {
        setLogs((prevState) => appendData(prevState, loggingEvents));
      })
      .finally(() => {
        timerRef.current = setTimeout(() => {
          timeFn();
        }, 1000);
      });
  }, [clientId]);

  useEffect(() => {
    if (!clientId) {
      return;
    }

    timeFn();

    /* 清理定时器资源 */
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [clientId, timeFn]);

  const clearLogs = React.useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    clearLogs,
  };
};
