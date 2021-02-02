import React from 'react';

import { Log } from '../../../interfaces/log.interface';
import ConsoleItem from './console-item';
import ConsoleToolBar from './console-tool-bar';

export interface ConsoleProps {
  logs: Log[];
  onClear: () => void;
}

const Console = React.memo(
  (props: ConsoleProps) => {
    const { logs, onClear } = props;

    return (
      <div
        style={{
          height: '100%',
          paddingTop: 8,
        }}
      >
        {/* tool bar */}
        <ConsoleToolBar />

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
