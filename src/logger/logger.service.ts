import { Injectable } from '@nestjs/common';
import { createLogger, LoggerOptions } from 'winston';
import * as winston from 'winston';
import * as chalk from 'chalk';
import * as moment from 'moment';

@Injectable()
export class LoggerService implements LoggerService {
  private readonly logger;
  private level = 'info';
  private context: string;

  constructor() {
    this.logger = createLogger(this.getLoggerOptions(this.level));
    this.setContext('main');
  }

  getLoggerOptions(level: string): LoggerOptions {
    const logTransports = [
      new winston.transports.Console({
        log: ({ level, message }) => this.logToConsole(level, message),
      }),
    ];

    return {
      level: level,
      transports: [...logTransports],
    };
  }

  setContext(context: string): this {
    this.context = context;

    return this;
  }

  setLevel(level: string): this {
    this.level = level;

    const loggerOptions = this.getLoggerOptions(level);
    this.overrideOptions(loggerOptions);

    return this;
  }

  log(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
  }

  error(message: string, trace?: string): void {
    this.setLevel('error');
    const currentDate = new Date();
    this.logger.error(`${message} ${trace ? ` -> trace: ${trace}` : ''}`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
  }

  warn(message: string): void {
    this.setLevel('warn');
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
  }

  info(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
  }

  debug(message: string): void {
    this.setLevel('debug');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
  }

  overrideOptions(options: LoggerOptions): void {
    this.logger.configure(options);
  }

  private logToConsole(level: string, message: string): void {
    let result;
    const color = chalk;
    const time = moment().format('YYYY-MM-DD HH:mm:ss');

    switch (level) {
      default:
      case 'info':
        result = `[${color.blue('INFO')}] ${color.dim.yellow.bold.underline(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
      case 'error':
        result = `[${color.red('ERR')}] ${color.dim.yellow.bold.underline(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
      case 'warn':
        result = `[${color.yellow('WARN')}] ${color.dim.yellow.bold.underline(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
    }
    console[level](result);

    this.logger.close();
  }
}
