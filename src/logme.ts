import { initLogMeUI } from "./ui.js";

type LogType = 'info' | 'warn' | 'error';

export interface LogEntry {
  type: LogType;
  message: any[];
  timestamp: string;
}

export class LogMe {
  private logs: LogEntry[] = [];
  private listeners: ((entry: LogEntry) => void)[] = [];
  private uiInitialized = false;

  private ensureUI() {
    if (!this.uiInitialized) {
      initLogMeUI();
      this.uiInitialized = true;
    }
  }

  log(type: LogType, ...message: any[]) {
    this.ensureUI();
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const timestamp = `${day}/${month} ${hours}:${minutes}:${seconds}:${milliseconds}`;
    
    const entry: LogEntry = {
      type,
      message,
      timestamp,
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
