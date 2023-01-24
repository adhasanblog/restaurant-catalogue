const assert = require('assert');
const { expect } = require('codeceptjs');

Feature('Create and Submit Customer Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
  I.waitForElement('restaurant-item a', 10);
});

Scenario('Showing detail restaurant page', ({ I }) => {
  I.seeElement('restaurant-item a');
  const firstRestaurant = locate('restaurant-item a').first();
  I.click(firstRestaurant);
});

Scenario('Success submit review', ({ I }) => {
  I.seeElement('restaurant-item a');
  const firstRestaurant = locate('restaurant-item a').first();
  I.click(firstRestaurant);
  I.scrollTo('form-review');

  const customerName = 'Febri';
  const customerReview = 'Makanannya enak sekali';

  I.fillField('#name', customerName);
  I.fillField('#review', customerReview);

  I.click('form-review button');

  I.see(
    'Your review has been successfully submitted! Thank you for sharing your feedback with us.',
    '.swal2-html-container',
  );
});

Scenario('Failed review submission when the name field is empty', ({ I }) => {
  I.seeElement('restaurant-item a');
  const firstRestaurant = locate('restaurant-item a').first();
  I.click(firstRestaurant);
  I.scrollTo('form-review');

  const customerReview = 'Makanannya enak sekali';

  I.fillField('#review', customerReview);

  I.click('form-review button');

  I.see(
    'We apologize, but there was an issue submitting your review (should contain name).',
    '.swal2-html-container',
  );
});

Scenario('Failed review submission when the review field is empty', ({ I }) => {
  I.seeElement('restaurant-item a');
  const firstRestaurant = locate('restaurant-item a').first();
  I.click(firstRestaurant);
  I.scrollTo('form-review');

  const customerName = 'Febri';

  I.fillField('#name', customerName);

  I.click('form-review button');

  I.see(
    'We apologize, but there was an issue submitting your review (should contain review).',
    '.swal2-html-container',
  );
});
