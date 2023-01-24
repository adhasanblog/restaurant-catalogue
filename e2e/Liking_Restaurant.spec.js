const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty favorite restaurant', ({ I }) => {
  I.see('Data not Found', '.errorMessage');
});

Scenario('Liking one restaurant', async ({ I }) => {
  I.see('Data not Found', '.errorMessage');

  I.amOnPage('/');

  I.waitForElement('restaurant-item a', 10);
  I.seeElement('restaurant-item a');

  const firstRestaurant = locate('restaurant-item a').first();
  const firstRestaurantTitle = await I.grabTextFrom('restaurant-item h3');
  I.click(firstRestaurant);

  I.seeElement('button-favorite button');
  I.click('button-favorite button');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item h3');
  const likedRestaurantTitle = await I.grabTextFrom('restaurant-item h3');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});