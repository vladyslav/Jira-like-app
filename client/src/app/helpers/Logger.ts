/* eslint-disable no-console */
export default class Logger {
  static log(msg: string, ...details: any[]): void {
    this.logMessage('log', msg, details);
  }

  static error(msg: string, ...details: any[]): void {
    this.logMessage('error', msg, details);
  }

  static warn(msg: string, ...details: any[]): void {
    this.logMessage('warn', msg, details);
  }

  static info(msg: string, ...details: any[]): void {
    this.logMessage('info', msg, details);
  }

  static logMessage(msgType: 'log' | 'error' | 'warn' | 'info', msg: string, details: any[]) {
    if (details.length > 0) {
      console[msgType](msg, details);
    } else {
      console[msgType](msg);
    }
  }
}
