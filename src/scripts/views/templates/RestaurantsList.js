import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import './RestaurantItem';

export default class RestaurantsList extends LitElement {
  static properties = {
    datas: {
      type: Array,
    },
  };

  constructor() {
    super();
    this.datas = null;
  }

  render() {
    if (!this.datas) {
      return html`
        <restaurant-item class="restaurant-item"> </restaurant-item>
        <restaurant-item class="restaurant-item"> </restaurant-item>
        <restaurant-item class="restaurant-item"> </restaurant-item>
        <restaurant-item class="restaurant-item"> </restaurant-item>
      `;
    }
    return html`
      ${map(
        this.datas,
        (data) => html` <restaurant-item
          class="restaurant-item"
          .restaurant=${data}>
        </restaurant-item>`,
      )}
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('restaurants-list', RestaurantsList);
