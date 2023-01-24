const SkipContentInitiator = {
  init({ anchor, content }) {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      this._skipToContent(content);
    });
  },

  _skipToContent(content) {
    const headerOffset = 50;
    const elementPosition = content.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    content.focus();
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  },
};

export default SkipContentInitiator;
