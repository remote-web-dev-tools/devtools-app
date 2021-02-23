import { LoggingEvent } from '@rwdt/logger';
import { ClientId } from '@interfaces/transfer-id.interface';
import { request } from '@utils/request';

export const fetchRemoteData = (clientId: ClientId): Promise<LoggingEvent[]> => {
  return request(`/api/transfer/data/${clientId}`);
};
