import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';

export default class HeroBanner extends LitElement {
  static properties = {
    image: {
      type: Object,
    },
    withTitle: {
      type: Boolean,
    },
    titleText: {
      type: Array,
    },
  };

  constructor() {
    super();
    this.image = null;
    this.withTitle = false;
    this.titleText = null;
  }

  render() {
    return html`
      <div class="hero-container">
        <picture>
          <source media="(max-width: 600px)" srcset=${this.image.small} />
          <source media="(max-width: 1000px)" srcset=${this.image.medium} />
          <img class="lazyload" src=${this.image.large} alt="" />
        </picture>
        ${this.withTitle
          ? html`<div class="title" tabindex="0">
              ${map(this.titleText, (title) => html`<p>${title}</p>`)}
            </div>`
          : ''}
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('hero-banner', HeroBanner);
