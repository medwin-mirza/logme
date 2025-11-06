import { log, type LogEntry } from './logme.js';

export function initLogMeUI() {
  const panel = document.createElement('div');
  panel.style.cssText = `
    position:fixed;bottom:55px;right:25px;
    width:50%;max-height:40vh;overflow:auto;
    background:#111;color:#eee;font-family:monospace;
    font-size:12px;padding:8px;border-radius:8px;
    box-shadow:0 0 10px rgba(0,0,0,0.5);z-index:99999;
    display:none;
  `;

  const toggle = document.createElement('button');
  toggle.textContent = '🪵';
  toggle.style.cssText = `
    position:fixed;bottom:10px;right:10px;
    z-index:100000;background:#333;color:#fff;
    border:none;border-radius:50%;width:40px;height:40px;
    cursor:pointer;font-size:20px;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
  `;
  toggle.onclick = () => {
    panel.style.display =
      panel.style.display === 'none' ? 'block' : 'none';
  };
  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  const render = (entry: LogEntry) => {
    const div = document.createElement('div');
    div.textContent = `${entry.type.toUpperCase()}: ${entry.message.join(' ')} (${entry.timestamp})`;
    div.style.color =
      entry.type === 'error' ? '#f55' :
      entry.type === 'warn' ? '#ffb400' :
      '#9f9';
    panel.appendChild(div);
  };

  log.getAll().forEach(render);
  log.onLog(render);
}
