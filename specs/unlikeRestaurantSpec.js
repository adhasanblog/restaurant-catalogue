import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="buttonFavoriteContainer"></div>';
  };

  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    addFavoriteButtonContainer();
  });
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('Should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="remove from favorites"]'),
    ).toBeTruthy();
  });

  it('Should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="add to favorites"]'),
    ).toBeFalsy();
  });

  it('Should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    document
      .querySelector('[aria-label="remove from favorites"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });

  it('Should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document
      .querySelector('[aria-label="remove from favorites"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
