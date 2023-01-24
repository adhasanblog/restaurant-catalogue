const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this._toogleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toogleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
    drawer.setAttribute('aria-expanded', 'true');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
    drawer.setAttribute('aria-expanded', 'false');
  },
};

export default DrawerInitiator;
