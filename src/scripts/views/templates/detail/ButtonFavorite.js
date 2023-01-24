import { LitElement, html } from 'lit';
import FavoriteRestaurantIdb from '../../../data/favorite-restaurant-idb';

export default class ButtonFavorite extends LitElement {
  static properties = {
    restaurant: {
      type: Object,
    },

    favorite: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.favorite = null;
    this.restaurant = null;
  }

  async clickHandler() {
    if (!this.favorite) {
      await FavoriteRestaurantIdb.putRestaurant(this.restaurant);
      this.favorite = true;
    } else {
      await FavoriteRestaurantIdb.deleteRestaurant(this.restaurant.id);
      this.favorite = false;
    }
  }

  render() {
    return html`
      <button
        class="button-favorite"
        aria-label="${this.favorite
          ? 'remove from favorites'
          : 'add to favorites'}"
        @click=${this.clickHandler}>
        ${this.favorite
          ? html` <i class="fa-solid fa-heart"></i> `
          : html`<i class="fa-regular fa-heart"></i>`}
      </button>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('button-favorite', ButtonFavorite);
