import 'regenerator-runtime/runtime';
import '../style/main.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#drawerNavigation'),
  content: document.querySelector('#mainContent'),
  skipContent: document.querySelector('#skipToContent'),
  navigationAnchor: document.querySelectorAll('.navigationAnchor'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
