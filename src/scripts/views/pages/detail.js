import UrlParser from '../../routes/url-parse';
import DetailPageHelper from '../../utils/detail-page-helper';

const Detail = {
  async render() {
    return `
       <article id="detailRestaurant">
       <header id="headerRestaurant">
       </header>
       <div id="contentRestaurant"></div>
       <footer id="footerRestaurant"></footer>
       </article>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const headerRestaurantContainer =
      document.querySelector('#headerRestaurant');
    const contentRestaurantContainer =
      document.querySelector('#contentRestaurant');
    const footerRestaurantContainer =
      document.querySelector('#footerRestaurant');

    DetailPageHelper.init({
      url,
      container: {
        header: headerRestaurantContainer,
        content: contentRestaurantContainer,
        footer: footerRestaurantContainer,
      },
    });
  },
};

export default Detail;
