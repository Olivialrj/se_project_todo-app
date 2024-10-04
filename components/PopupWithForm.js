class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.document.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this.popupForm.querySelectorAll(".popup__input");
    const values = {};
    this._inputList.forEach((input) => {
      //add key/value pair
      //key is input.name
      //value is input.value
      //bracket notation
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(evt);
    });
  }
}

export default PopupWithForm;
