import { Logger, LoggingEvent } from '@rwdt/logger';

const delay = 100;
const atLeast = 200;

let lastSendTime: number;
let timeoutHandle: NodeJS.Timeout;
let logQueue: LoggingEvent[] = [];

function sendLog() {
  // const host = process.env.NODE_ENV === 'development' ? 'http://30.10.60.253:4000' : 'https://ffin.alibaba-inc.com';
  const host = 'http://localhost:6001';

  fetch(`${host}/api/transfer/upload`, {
    body: JSON.stringify({
      data: logQueue,
      serverId: '127.0.0.1',
    }),
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(() => {
      logQueue = [];
    })
    .catch((e) => {
      console.error(e);
    });
}

export const logger = new Logger({
  appender: [
    (loggingEvent) => {
      logQueue.push(loggingEvent);

      const now = Date.now();

      // 从未发送则直接处理
      if (!lastSendTime) {
        lastSendTime = now;
      }

      if (now - lastSendTime > atLeast) {
        lastSendTime = now;
        sendLog();
      } else {
        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
        }

        timeoutHandle = setTimeout(function () {
          sendLog();
        }, delay);
      }
    },
  ],
});
