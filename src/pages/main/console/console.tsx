import React from 'react';

import { Log } from '../../../interfaces/log.interface';
import ConsoleItem from './console-item';
import ConsoleToolBar, { ConsoleFilter } from './console-tool-bar';

export interface ConsoleProps {
  logs: Log[];
  onClear: () => void;
}

const Console = React.memo(
  (props: ConsoleProps) => {
    const { logs, onClear } = props;
    const [filter, setFilter] = React.useState<ConsoleFilter>({
      showLogLevel: ['INFO', 'WARN', 'ERROR'],
      showTimestamps: true,
    });

    const handleChangeFilter = (filter: ConsoleFilter) => {
      console.log(filter);
      setFilter(filter);
    };

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
        {logs.map((log) => (
          <ConsoleItem log={log} key={log.key} />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.logs === nextProps.logs
);

export default Console;
