const NavigationInitiator = {
  init({ drawer, navigationAnchor }) {
    drawer.addEventListener('click', (event) => {
      event.stopPropagation();

      if (event.target.classList.contains('navigationAnchor')) {
        navigationAnchor.forEach((anchor) => {
          anchor.classList.remove('active');
        });

        event.target.classList.add('active');
      }
    });
  },
};

export default NavigationInitiator;
