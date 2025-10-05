import './commands'

const app = window.top;
const HIDE_COMMAND_LOG_SELECTOR = '[data-hide-command-log-request]';
const HIDE_COMMAND_LOG_STYLES = '.command-name-request, .command-name-xhr { display: none }';

if (!app.document.head.querySelector(HIDE_COMMAND_LOG_SELECTOR)) {
  const style = app.document.createElement('style');
  style.innerHTML = HIDE_COMMAND_LOG_STYLES;
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}