import { LitElement, html } from 'lit';

export default class errorTemplate extends LitElement {
  static properties = {
    imageSrc: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
  };

  constructor() {
    super();
    this.image = null;
    this.imageAlt = null;
    this.errorMessage = null;
  }

  render() {
    return html`
      <div class="error" tabindex="0" aria-label="${this.imageAlt}">
        <picture>
          <source media="(max-width: 600px)" srcset=${this.image.small} />
          <source media="(max-width: 1000px)" srcset=${this.image.medium} />
          <img class="lazyload" src=${this.image.large} alt=${this.imagealt} />
        </picture>
        <p class="errorMessage">${this.errorMessage}</p>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('error-template', errorTemplate);
