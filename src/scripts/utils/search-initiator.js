const SearchInitiator = {
  init({ button, search, content }) {
    button.addEventListener('click', (event) => {
      this._showSearchBar({
        event,
        search,
        content,
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === '/') {
        this._showSearchBar({
          event,
          search,
          content,
        });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this._closeSearchBar({
          event,
          search,
          content,
        });
      }
    });

    content.addEventListener('click', (event) => {
      this._closeSearchBar({
        event,
        search,
        content,
      });
    });
  },

  _showSearchBar({ event, search, content }) {
    event.stopPropagation();
    search.classList.add('active');
    search.focus();
    content.classList.add('active');
  },

  _closeSearchBar({ event, search, content }) {
    event.stopPropagation();
    search.classList.remove('active');
    content.classList.remove('active');
  },
};

export default SearchInitiator;
