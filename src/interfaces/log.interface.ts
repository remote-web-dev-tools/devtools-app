import { LoggerLevel } from '@rwdt/logger';

export interface Log {
  data: any;
  date: Date;
  level: LoggerLevel;
}
