const NotFound404 = {
  async render() {
    return `
        <div class="container">
        </div>
       
    `;
  },

  async afterRender() {
    const container = document.querySelector('.container');
    const errorElement = document.createElement('error-template');

    errorElement.image = {
      small: './images/404-not-found-small.png',
      medium: './images/404-not-found-medium.png',
      large: './images/404-not-found-large.png',
    };
    errorElement.imageAlt = '404 not found';
    errorElement.errorMessage =
      'Error 404: The requested page could not be found.';

    container.appendChild(errorElement);
  },
};

export default NotFound404;
