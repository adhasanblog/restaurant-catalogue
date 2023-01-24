import RestaurantDataSource from '../data/restaurant-datasource';
import '../views/templates/HeroBanner';
import '../views/templates/RestaurantsList';
import '../views/templates/SearchBar';

const HomePageHelper = {
  async init({ container }) {
    const { hero, restaurant } = container;

    try {
      const restos = RestaurantDataSource.restoList();

      this._showCardListSection({
        datas: restos,
        container: restaurant,
      });

      this._showHeroCarousel(hero);
    } catch (error) {
      this._showError(restaurant);
    }
  },

  _showHeroCarousel(container) {
    const heroBanner = document.createElement('hero-banner');
    heroBanner.image = {
      small: './images/hero-image-small.jpg',
      medium: './images/hero-image-medium.jpg',
      large: './images/hero-image-large.jpg',
    };
    heroBanner.withTitle = true;
    heroBanner.titleText = [
      'Discover the Best Restaurants in Town',
      'Explore a Wide Range of Cuisine Options',
    ];

    container.appendChild(heroBanner);
  },

  async _showCardListSection({ datas, container }) {
    const restaurantsList = document.createElement('restaurants-list');
    container.appendChild(restaurantsList);

    restaurantsList.datas = await datas;
  },

  _showError(container) {
    const errorTemplate = document.createElement('error-template');
    errorTemplate.imageSrc = './images/not-connect.png';
    errorTemplate.imageAlt = 'data not found';

    container.appendChild(errorTemplate);
  },
};

export default HomePageHelper;
