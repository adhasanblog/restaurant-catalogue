import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
import ButtonFavoritePresenter from '../../src/scripts/utils/button-favorite-presenter';

const createButtonFavoritePresenterWithRestaurant = async (restaurant) => {
  await ButtonFavoritePresenter.init({
    buttonFavoriteContainer: document.querySelector('#buttonFavoriteContainer'),
    buttonFavoriteElement: document.createElement('button-favorite'),
    favoriteRestaurant: FavoriteRestaurantIdb,
    restaurant,
  });
};

export { createButtonFavoritePresenterWithRestaurant };
