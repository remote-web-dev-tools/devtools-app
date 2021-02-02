import React from 'react';

import { Log } from './log.interface';
import ConsoleItem from './console-item';
import ConsoleToolBar, { ConsoleFilter, SupportLoggerLevel } from './console-tool-bar';

export interface ConsoleProps {
  logs: Log[];
  onClear: () => void;
}

const Console = React.memo(
  (props: ConsoleProps) => {
    const { logs, onClear } = props;

    const [showLogs, setShowLogs] = React.useState<Log[]>([]);

    const [filter, setFilter] = React.useState<ConsoleFilter>({
      showLogLevel: ['INFO', 'WARN', 'ERROR'],
      showTimestamps: true,
    });

    const handleChangeFilter = (filter: ConsoleFilter) => {
      setFilter(filter);
    };

    React.useEffect(() => {
      const { showLogLevel } = filter;
      let newShowLogs: Log[] = [];

      /* 1. filter logger level */
      newShowLogs = logs.filter((value) => showLogLevel.includes(value.level as SupportLoggerLevel));

      setShowLogs(newShowLogs);
    }, [logs, filter]);

    return (
      <div
        style={{
          height: '100%',
          paddingTop: 8,
        }}
      >
        {/* tool bar */}
        <ConsoleToolBar filter={filter} onClear={onClear} onChangeFilter={handleChangeFilter} />

        {/* log content */}
        {showLogs.map((log) => (
          <ConsoleItem filter={filter} log={log} key={log.key} />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.logs === nextProps.logs
);

export default Console;
