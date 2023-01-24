import FavoriteRestaurant from '../../data/favorite-restaurant-idb';
import '../templates/errorTemplate';

const Favorite = {
  async render() {
    return `
      <section id="restaurantFavorite">
          <div id="restaurantsContainer" class="container">
            <h2 tabindex="0">Favorite Restaurants</h2>
          </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurant.getAllRestaurant();
    const restaurantsContainer = document.querySelector(
      '#restaurantsContainer',
    );
    const restaurantsList = document.createElement('restaurants-list');
    const errorTemplate = document.createElement('error-template');
    errorTemplate.image = {
      small: './images/data-not-found-small.png',
      medium: './images/data-not-found-medium.png',
      large: './images/data-not-found-large.png',
    };
    errorTemplate.imageAlt = 'data not found';
    errorTemplate.errorMessage =
      'No favorite restaurants found. Please add some to your favorites.';

    if (restaurants.length === 0) {
      restaurantsContainer.appendChild(errorTemplate);
      return;
    }

    restaurantsList.datas = restaurants;
    restaurantsContainer.appendChild(restaurantsList);
  },
};

export default Favorite;
