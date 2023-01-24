import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';

import RestaurantDataSource from '../../../data/restaurant-datasource';

export default class ReviewRestaurant extends LitElement {
  static properties = {
    restaurant: {
      type: Object,
    },
    offset: {
      type: Number,
    },
    limit: {
      type: Number,
    },
    customerReview: {
      type: Object,
    },
    inPage: {
      type: Number,
    },
  };

  constructor() {
    super();
    this.restaurant = null;
    this.reviewPerPage = 5;
    this.limit = 5;
    this.offset = 0;
    this.paginations = [];
    this.inPage = 1;
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener('review-submitted', () => {
      this._updateReview();
    });
  }

  clickHandler({ offset, limit, page }) {
    this.offset = offset;
    this.limit = limit;
    this.inPage = page;
  }

  render() {
    const totalPage = Math.ceil(
      this.restaurant.customerReviews.length / this.reviewPerPage,
    );
    let addOffset = 0;
    const addLimit = 5;
    const { customerReviews } = this.restaurant;
    return html`
      <div class="reviews" tabindex="0" aria-label="Customers Reviews">
        <h3 tabindex="0">
          What Our Customers Are Saying, ${customerReviews.length} Reviews :
          Page ${this.inPage}
        </h3>
        ${map(
          customerReviews.slice(this.offset, this.limit),
          (review) => html`
            <div
              class="reviews__item"
              tabindex="0"
              aria-label="${review.name} says, ${review.review} on ${review.date}">
              <div class="customer">
                <span>${review.name.charAt(0).toUpperCase()}</span>
                <div class="customer__data">
                  <h4 class="name">${review.name}</h4>
                  <p class="date">${review.date}</p>
                  <p class="review">${review.review}</p>
                </div>
              </div>
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.75 11.0059H18V8.00586C18 6.35117 19.3453 5.00586 21 5.00586H21.375C21.9984 5.00586 22.5 4.5043 22.5 3.88086V1.63086C22.5 1.00742 21.9984 0.505859 21.375 0.505859H21C16.8563 0.505859 13.5 3.86211 13.5 8.00586V19.2559C13.5 20.498 14.5078 21.5059 15.75 21.5059H21.75C22.9922 21.5059 24 20.498 24 19.2559V13.2559C24 12.0137 22.9922 11.0059 21.75 11.0059ZM8.25 11.0059H4.5V8.00586C4.5 6.35117 5.84531 5.00586 7.5 5.00586H7.875C8.49844 5.00586 9 4.5043 9 3.88086V1.63086C9 1.00742 8.49844 0.505859 7.875 0.505859H7.5C3.35625 0.505859 0 3.86211 0 8.00586V19.2559C0 20.498 1.00781 21.5059 2.25 21.5059H8.25C9.49219 21.5059 10.5 20.498 10.5 19.2559V13.2559C10.5 12.0137 9.49219 11.0059 8.25 11.0059Z"
                  fill="#232631" />
              </svg>
            </div>
          `,
        )}
        <nav class="reviews__paging">
          <ul>
            ${map(
              range(totalPage),
              (i) => html`<li>
                <a
                  aria-label="Review Page ${i + 1}"
                  href="./#/detail/${this.restaurant.id}#reviews"
                  @click=${(event) => {
                    event.preventDefault();
                    const { offset, limit, page } = event.target.dataset;

                    const listAnchor = this.querySelectorAll('li a');

                    this._scrollToTopReview();

                    listAnchor.forEach((anchor) => {
                      if (anchor.classList.contains('active')) {
                        anchor.classList.remove('active');
                      }
                    });

                    event.target.classList.add('active');
                    this.clickHandler({
                      offset,
                      limit,
                      page,
                    });
                  }}
                  class=${i + 1 === 1 ? 'active' : ''}
                  data-page=${i + 1}
                  data-offset=${i + 1 === 1 ? addOffset : (addOffset += 5)}
                  data-limit=${(i + 1) * addLimit}>
                  ${i + 1}
                </a>
              </li>`,
            )}
          </ul>
        </nav>
      </div>
    `;
  }

  _scrollToTopReview() {
    const targetElement = document.querySelector('.reviews');
    const headerOffset = 45;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    targetElement.focus();
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  async _updateReview() {
    const restaurant = await RestaurantDataSource.restoDetail({
      id: this.restaurant.id,
      cache: 'reload',
    });
    this.restaurant = restaurant;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('review-restaurant', ReviewRestaurant);
