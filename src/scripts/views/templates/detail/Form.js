import { LitElement, html } from 'lit';
import RestaurantDataSource from '../../../data/restaurant-datasource';
import SweetalertHelper from '../../../utils/sweetalert-helper';

export default class FormReview extends LitElement {
  static properties = {
    restaurantId: {
      type: String,
    },
  };

  constructor() {
    super();
    this.restaurantId = null;
    this.customerReview = {
      name: '',
      review: '',
    };
  }

  getInputName(event) {
    const input = event.target;
    this.customerReview.name = input.value;
  }

  getInputDescription(event) {
    const input = event.target;
    this.customerReview.review = input.value;
  }

  render() {
    return html`
      <h3 tabindex="0">Share Your Experience</h3>
      <form
        id="formReview"
        @submit=${(event) => {
          event.preventDefault();
          this.sendReviewHandler();
        }}>
        <label id="customerName" for="name">Customer Name</label>
        <input
          id="name"
          name="name"
          aria-labelledby="customerName"
          @input=${this.getInputName}
          type="text"
          value="${this.customerReview.name}"
          placeholder="Customer Name" />
        <label id="customerReview" for="review">Write Review</label>
        <textarea
          id="review"
          name="review"
          aria-labelledby="customerReview"
          @input=${this.getInputDescription}
          value=${this.customerReview.review}
          rows="3"
          placeholder="Customer Review"></textarea>
        <button type="submit">Submit Review</button>
      </form>
    `;
  }

  async sendReviewHandler() {
    if (!navigator.onLine) {
      SweetalertHelper.init({
        icon: 'error',
        message:
          'Unable to add review. Please check your internet connection and try again.',
      });
      this.querySelector('#formReview').reset();
      this.customerReview.name = '';
      this.customerReview.review = '';
    }

    const customerReview = {
      id: this.restaurantId,
      name: this.customerReview.name,
      review: this.customerReview.review,
    };

    const sendCustomerReview = await RestaurantDataSource.restoReview(
      customerReview,
    );

    if (!sendCustomerReview.error) {
      document.dispatchEvent(new Event('review-submitted'));
      SweetalertHelper.init({
        icon: 'success',
        message:
          'Your review has been successfully submitted! Thank you for sharing your feedback with us.',
      });
    } else {
      SweetalertHelper.init({
        icon: 'error',
        message: `We apologize, but there was an issue submitting your review (${sendCustomerReview.message}).`,
      });
    }

    this.querySelector('#formReview').reset();
    this.customerReview.name = '';
    this.customerReview.review = '';
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('form-review', FormReview);
