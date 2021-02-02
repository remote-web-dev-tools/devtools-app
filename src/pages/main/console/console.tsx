import React from 'react';

export interface ConsoleProps {}

export default function Console(props: ConsoleProps) {
  return (
    <div
      style={{
        backgroundColor: 'red',
        height: '100%',
      }}
    >
      Console Work
    </div>
  );
}
