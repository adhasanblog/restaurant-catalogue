import RestaurantDataSource from '../data/restaurant-datasource';
import CONFIG from '../global/config';
import '../views/templates/detail/Header';
import '../views/templates/detail/Content';
import '../views/templates/detail/Footer';
import ButtonFavoritePresenter from './button-favorite-presenter';
import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';

const DetailPageHelper = {
  async init({ container, url }) {
    const { header, content, footer } = container;

    try {
      const restaurant = await RestaurantDataSource.restoDetail({
        id: url.id,
        cache: 'default',
      });

      this._showHeaderRestaurant({
        restaurant,
        container: header,
      });

      this._showContentRestaurant({
        restaurant,
        container: content,
      });

      this._showFooterRestaurant({
        restaurant,
        container: footer,
      });
    } catch (error) {
      this._showError({
        container: content,
        message: error.message,
      });
    }
  },

  _showHeaderRestaurant({ restaurant, container }) {
    const headerRestaurant = document.createElement('header-restaurant');
    const heroBanner = document.createElement('hero-banner');

    headerRestaurant.restaurant = restaurant;
    heroBanner.image = {
      small: CONFIG.BASE_IMG_URL.small + restaurant.pictureId,
      medium: CONFIG.BASE_IMG_URL.medium + restaurant.pictureId,
      large: CONFIG.BASE_IMG_URL.large + restaurant.pictureId,
    };

    container.appendChild(headerRestaurant);
    container.appendChild(heroBanner);
  },

  async _showContentRestaurant({ restaurant, container }) {
    const contentRestaurant = document.createElement('content-restaurant');
    contentRestaurant.restaurant = restaurant;
    container.appendChild(contentRestaurant);

    await ButtonFavoritePresenter.init({
      buttonFavoriteContainer: container,
      buttonFavoriteElement: document.createElement('button-favorite'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant,
    });
  },

  _showFooterRestaurant({ restaurant, container }) {
    const footerRestaurant = document.createElement('footer-restaurant');
    footerRestaurant.classList.add('container');
    footerRestaurant.restaurant = restaurant;

    container.appendChild(footerRestaurant);
  },

  _showError({ container, message }) {
    const errorTemplate = document.createElement('error-template');
    errorTemplate.image = {
      small: './images/not-connect-small.png',
      medium: './images/not-connect-medium.png',
      large: './images/not-connect-large.png',
    };
    errorTemplate.imageAlt = 'data not found';
    errorTemplate.errorMessage = message;

    container.appendChild(errorTemplate);
  },
};

export default DetailPageHelper;
