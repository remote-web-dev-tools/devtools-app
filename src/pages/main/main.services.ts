import { LoggingEvent } from '@rwdt/logger';
import { ClientId, ServerId } from '../../interfaces/transfer-id.interface';
import { request } from '../../utils/request';

export const fetchClientIds = (): Promise<{ serverId: string; clientIds: ClientId[] }> => {
  return request('/api/transfer/client-ids');
};

export const fetchRemoteData = (serverId: ServerId, clientId: ClientId): Promise<LoggingEvent[]> => {
  return request(`/api/transfer/data/${serverId}/${clientId}`).then((res) => res.data);
};
