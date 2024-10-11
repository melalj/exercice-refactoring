"use strict";

const { createLogger, format, transports } = require("winston");
import path from "path";
import winston from "winston";

const logFileName = (
  (process.env.APP_NAME || "app") +
  "." +
  (process.env.NODE_ENV || "no_node_env") +
  ".log"
)
  .replace(/ /g, "_")
  .toLocaleLowerCase();

/**
 * Logging Levels:
 *
 * emerg: 0,
 * alert: 1
 * crit: 2
 * error: 3
 * warning: 4
 * notice: 5
 * info: 6
 * debug: 7
 *
 */

/**
 * Format
 */
const logFormatCombine = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(({ level, message, timestamp }) => {
    if (message instanceof Error) {
      let result = `${timestamp} [${level.toUpperCase()}] ${message.name}\n`;
      message?.stack?.split("\n").forEach((line: any) => {
        result += `${timestamp} [${level.toUpperCase()}] ${line.trim()}\n`;
      });
      return result;
    }
    if (message instanceof Object)
      return `${timestamp} [${level.toUpperCase()}] ${JSON.stringify(message)}`;
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
  })
);

/**
 * File log
 */
const _logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File({
      filename: path.join("./log/", logFileName),
      level: process.env.LOG_LEVEL || "info",
      format: logFormatCombine,
    }),
  ],
});

/**
 * Console log
 */
if (
  process.env.NODE_ENV === "development" &&
  process.env.LOG_TO_CONSOLE == "true"
) {
  _logger.add(
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || "debug",
      format: logFormatCombine,
    })
  );
}

export const logger = {
  log: (level: string, message: any) => {
    _logger.log({ level, message });
  },
  emerg: (message: any) => {
    _logger.log({ level: "emerg", message });
  },
  alert: (message: any) => {
    _logger.log({ level: "alert", message });
  },
  crit: (message: any) => {
    _logger.log({ level: "crit", message });
  },
  error: (message: any) => {
    _logger.log({ level: "error", message });
  },
  warning: (message: any) => {
    _logger.log({ level: "warning", message });
  },
  notice: (message: any) => {
    _logger.log({ level: "notice", message });
  },
  info: (message: any) => {
    _logger.log({ level: "info", message });
  },
  debug: (message: any) => {
    _logger.log({ level: "debug", message });
  },
};
