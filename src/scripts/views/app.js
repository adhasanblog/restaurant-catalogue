import routes from '../routes/routes';
import UrlParser from '../routes/url-parse';
import DrawerInitiator from '../utils/drawer-initiator';
import NavigationInitiator from '../utils/navigation-initiator';
import SkipContentInitiator from '../utils/skip-content-initiator';

class App {
  constructor({
    button,
    drawer,
    search,
    content,
    skipContent,
    navigationAnchor,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._search = search;
    this._skipContent = skipContent;
    this._navigationAnchor = navigationAnchor;
    this._initialAppShell();
  }

  _initialAppShell() {
    NavigationInitiator.init({
      drawer: this._drawer,
      navigationAnchor: this._navigationAnchor,
    });

    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    SkipContentInitiator.init({
      anchor: this._skipContent,
      content: this._content,
    });
  }

  async renderPage() {
    let url = UrlParser.parseActiveUrlWithCombiner();
    const objectKey = Object.keys(routes);
    objectKey.includes(url) ? url : (url = '/404');
    const page = routes[url];

    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
