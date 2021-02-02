import React, { useEffect } from 'react';
import { ClientId, ServerId } from '../../interfaces/transfer-id.interface';
import { Log } from './console/log.interface';
import { fetchClientIds, fetchRemoteData } from './main.services';

export const useClientIds = () => {
  const [clientIds, setClientIds] = React.useState<ClientId[]>([]);
  const [serverId, setServerId] = React.useState<ServerId>('');
  const [selectedClientId, setSelectedClientId] = React.useState('');

  React.useEffect(() => {
    fetchClientIds().then(({ serverId, clientIds }) => {
      setClientIds(clientIds);
      setServerId(serverId);

      if (clientIds.length > 0) {
        setSelectedClientId(clientIds[0]);
      }
    });
  }, []);

  return { clientIds, serverId, selectedClientId, setSelectedClientId };
};

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

export const useFetchData = (serverId: ServerId, clientId: ClientId) => {
  const [logs, setLogs] = React.useState<Log[]>([]);

  const timerRef = React.useRef<NodeJS.Timeout>();

  const timeFn = React.useCallback(() => {
    fetchRemoteData(serverId, clientId)
      .then((loggingEvents) => {
        setLogs((prevState) => appendData(prevState, loggingEvents));
      })
      .finally(() => {
        timerRef.current = setTimeout(() => {
          timeFn();
        }, 1000);
      });
  }, [serverId, clientId]);

  useEffect(() => {
    if (!(serverId && clientId)) {
      return;
    }

    timeFn();

    /* 清理定时器资源 */
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [serverId, clientId, timeFn]);

  useEffect(() => {
    /* TODO: 处理切换 client */
  }, [clientId]);

  const clearLogs = React.useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    clearLogs,
  };
};
