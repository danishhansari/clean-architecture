import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} :  ${level} : ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MMM-DD:HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `${process.cwd()}/combined.log` }),
  ],
});

export { logger };
