import '../views/templates/detail/ButtonFavorite';

const ButtonFavoritePresenter = {
  async init({
    buttonFavoriteContainer,
    buttonFavoriteElement,
    favoriteRestaurant,
    restaurant,
  }) {
    this._buttonFavoriteContainer = buttonFavoriteContainer;
    this._buttonFavoriteElement = buttonFavoriteElement;
    this._favoriteRestaurant = favoriteRestaurant;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._restaurantExistInDB(id)) {
      this._buttonFavoriteElement.favorite = true;
    } else {
      this._buttonFavoriteElement.favorite = false;
    }
    this._buttonFavoriteElement.restaurant = this._restaurant;
    this._buttonFavoriteContainer.appendChild(this._buttonFavoriteElement);
  },

  async _restaurantExistInDB(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },
};

export default ButtonFavoritePresenter;
