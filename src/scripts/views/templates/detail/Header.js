import { LitElement, html } from 'lit';

export default class HeaderRestaurant extends LitElement {
  static properties = {
    restaurant: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.restaurant = null;
  }

  render() {
    return html`
      <div
        class="header-restaurant"
        tabindex="0"
        aria-label="${this.restaurant
          .name} Restaurant. Category : ${this.restaurant.categories
          .map((category) => category.name)
          .join(', ')}. Rating ${this.restaurant.rating} with ${this.restaurant
          .customerReviews.length} Reviews. Located in ${this.restaurant
          .city}, ${this.restaurant.address}">
        <h2>${this.restaurant.name}</h2>
        <div class="header-restaurant__description">
          <div class="top">
            <p>
              <span>
                <i class="fa-solid fa-star"></i>
                ${this.restaurant.rating}
              </span>
              <span>${this.restaurant.customerReviews.length} Reviews</span>
            </p>
            <p><span>Located in</span><span>${this.restaurant.city}</span></p>
            <p>
              <span>Categories</span>
              <span
                >${this.restaurant.categories
                  .map((category) => category.name)
                  .join(', ')}
              </span>
            </p>
          </div>
          <div class="bottom">
            <p>
              <i class="fa-solid fa-location-dot"></i>
              ${this.restaurant.address}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('header-restaurant', HeaderRestaurant);
