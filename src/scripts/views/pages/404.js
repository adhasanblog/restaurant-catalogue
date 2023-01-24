const NotFound404 = {
  async render() {
    return `
        <p>404 Not Found</p>
       
    `;
  },

  async afterRender() {
    console.log('Hay dari 404');
  },
};

export default NotFound404;
