import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';

export default class MenuRestaurant extends LitElement {
  static properties = {
    menus: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.menus = null;
  }

  render() {
    return html`
      <h2 tabindex="0">Food Choices</h2>
      <div class="menus">
        ${map(
          this.menus.foods,
          (food) => html`
            <div class="menu-item" tabindex="0" aria-label=${food.name}>
              <img
                class="lazyload"
                data-src="./images/dummy-image.jpg"
                alt="" />
              <h4>${food.name}</h4>
            </div>
          `,
        )}
      </div>
      <h2 tabindex="0">Drink Choices</h2>
      <div class="menus">
        ${map(
          this.menus.drinks,
          (drink) => html`
            <div class="menu-item" tabindex="0" aria-label=${drink.name}>
              <img
                class="lazyload"
                data-src="./images/dummy-image.jpg"
                alt="" />
              <h3>${drink.name}</h3>
            </div>
          `,
        )}
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('menu-restaurant', MenuRestaurant);
