import { LitElement, html } from 'lit';
import RestaurantDataSource from '../../../data/restaurant-datasource';

export default class FooterRestaurant extends LitElement {
  static properties = {
    restaurants: {
      type: Array,
    },
    restaurant: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.restaurants = [];
    this.restaurant = null;
    this.sameCityRestaurants = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchApiList();
  }

  async fetchApiList() {
    const restaurants = await RestaurantDataSource.restoList();
    this.restaurants = restaurants;
  }

  render() {
    this.sameCityRestaurants = this.restaurants.filter(
      (restaurant) =>
        restaurant.city === this.restaurant.city &&
        restaurant.name !== this.restaurant.name,
    );

    return html`
      <h2 tabindex="0">Restaurants in the Same City</h2>
      <restaurants-list .datas=${this.sameCityRestaurants}></restaurants-list>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('footer-restaurant', FooterRestaurant);
