import React, { useEffect } from 'react';
import { ClientId, ServerId } from '../../interfaces/transfer-id.interface';
import { request } from '../../utils/request';
import { Log } from '../../interfaces/log.interface';
import { LoggingEvent } from '@rwdt/logger';

const fetchClientIds = (): Promise<{ serverId: string; data: ClientId[] }> => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      serverId: '127.0.0.1',
      data: ['10.0.0.1', '10.0.0.2', '10.0.0.3'],
    });
  }

  return request('/api/transfer/client-ids');
};

export const useClientIds = () => {
  const [clientIds, setClientIds] = React.useState<ClientId[]>([]);
  const [serverId, setServerId] = React.useState<ServerId>('');
  const [selectedClientId, setSelectedClientId] = React.useState('');

  React.useEffect(() => {
    fetchClientIds().then(({ serverId, data }) => {
      setClientIds(data);
      setServerId(serverId);

      if (data.length > 0) {
        setSelectedClientId(data[0]);
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

const fetchRemoteData = (serverId: ServerId, clientId: ClientId): Promise<LoggingEvent[]> => {
  return Promise.resolve([
    { level: 'INFO', data: ['logger level info'], date: new Date(), context: { type: 'console' } },
    { level: 'DEBUG', data: ['logger level debug'], date: new Date(), context: { type: 'console' } },
    { level: 'WARN', data: ['logger level warn'], date: new Date(), context: { type: 'console' } },
    { level: 'ERROR', data: ['logger level error'], date: new Date(), context: { type: 'console' } },
    { level: 'INFO', data: ['string'], date: new Date(), context: { type: 'console' } },
    { level: 'INFO', data: [1, 2, 3], date: new Date(), context: { type: 'console' } },
    { level: 'INFO', data: [true, false, undefined, null], date: new Date(), context: { type: 'console' } },
    { level: 'INFO', data: [[1, 2, 3, { a: { b: { c: 1 } } }]], date: new Date(), context: { type: 'console' } },
    { level: 'INFO', data: [{ a: { b: { c: 1 } } }], date: new Date(), context: { type: 'console' } },
  ]);
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
          // timeFn();
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
