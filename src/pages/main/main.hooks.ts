import React from 'react';
import { ClientId, ServerId } from '../../interfaces/transfer-id.interface';
import { request } from '../../utils/request';

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
