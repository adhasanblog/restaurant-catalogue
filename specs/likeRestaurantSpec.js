import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Liking a Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="buttonFavoriteContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });
  it('Should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="add to favorites"]'),
    ).toBeTruthy();
  });

  it('Should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="remove from favorites"]'),
    ).toBeFalsy();
  });

  it('Should be able to like the restaurant', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    document
      .querySelector('[aria-label="add to favorites"]')
      .dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document
      .querySelector('[aria-label="add to favorites"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 1 }]);
  });

  it('Should not add a restaurant when it has no id', async () => {
    await TestFactories.createButtonFavoritePresenterWithMovie({});
    document
      .querySelector('[aria-label="add to favorites"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
