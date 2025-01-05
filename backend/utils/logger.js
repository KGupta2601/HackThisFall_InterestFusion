const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { format, transports, createLogger } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
  },
};

winston.addColors(customLevels.colors);

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  levels: customLevels.levels,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      level: 'info',
      handleExceptions: true,
      zippedArchive: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message) {
    logger.http(message.trim());
  },
};

module.exports = logger;