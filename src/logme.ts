type LogType = 'info' | 'warn' | 'error';

export interface LogEntry {
  type: LogType;
  message: any[];
  timestamp: string;
}

export class LogMe {
  private logs: LogEntry[] = [];
  private listeners: ((entry: LogEntry) => void)[] = [];

  log(type: LogType, ...message: any[]) {
    const entry: LogEntry = {
      type,
      message,
      timestamp: new Date().toISOString(),
    };
    this.logs.push(entry);
    this.listeners.forEach(l => l(entry));

    // Also mirror in console
    console[type === 'info' ? 'log' : type](...message);
  }

  info(...msg: any[]) { this.log('info', ...msg); }
  warn(...msg: any[]) { this.log('warn', ...msg); }
  error(...msg: any[]) { this.log('error', ...msg); }

  onLog(callback: (entry: LogEntry) => void) {
    this.listeners.push(callback);
  }

  getAll() {
    return this.logs;
  }
}

export const log = new LogMe();
