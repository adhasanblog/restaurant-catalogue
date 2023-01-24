import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import './Description';
import './Review';
import './Form';
import './Menu';

export default class ContentRestaurant extends LitElement {
  static properties = {
    restaurant: {
      type: Object,
    },
    tabs: {
      type: Array,
    },
  };

  constructor() {
    super();
    this.restaurant = null;
    this.tabs = [
      {
        id: 1,
        label: 'Description',
        content: (data) =>
          html`
            <description-restaurant .description=${data.description}>
            </description-restaurant>
            <review-restaurant .restaurant=${data}> </review-restaurant>
            <form-review .restaurantId=${data.id}></form-review>
          `,
        active: true,
      },
      {
        id: 2,
        label: 'Menus',
        content: (data) =>
          html` <menu-restaurant .menus=${data.menus}> </menu-restaurant> `,
        active: false,
      },
    ];
  }

  clickHandler(id) {
    this.tabs = this.tabs.map((tab) => ({
      ...tab,
      active: tab.id === id,
    }));
  }

  render() {
    return html`
      <div class="content">
        <nav class="tab-menu">
          <ul>
            ${map(
              this.tabs,
              (tab) =>
                html`
                  <li>
                    <a
                      class=${tab.active ? 'active' : ''}
                      @click=${(event) => {
                        event.preventDefault();
                        const targetElement =
                          document.querySelector('.tab-content');
                        const headerOffset = 50;
                        const elementPosition =
                          targetElement.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition + window.pageYOffset - headerOffset;

                        targetElement.focus();
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth',
                        });

                        this.clickHandler(tab.id);
                      }}
                      @enter=${(event) => {
                        event.preventDefault();
                        const targetElement =
                          document.querySelector('.tab-content');
                        const headerOffset = 50;
                        const elementPosition =
                          targetElement.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition + window.pageYOffset - headerOffset;

                        targetElement.focus();
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth',
                        });
                      }}
                      href="#${tab.label}">
                      ${tab.label}
                    </a>
                  </li>
                `,
            )}
          </ul>
        </nav>
        ${map(this.tabs, (tab) =>
          tab.active
            ? html`
                <div class="tab-content" tabindex="0" aria-label="Content">
                  ${tab.content(this.restaurant)}
                </div>
              `
            : '',
        )}
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('content-restaurant', ContentRestaurant);
