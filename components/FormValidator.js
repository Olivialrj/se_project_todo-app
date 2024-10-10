class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    console.log(`Checking: ${inputElement.value}`);
    console.log(`Validity:`, inputElement.validity);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage) {
    // console.log(`Showing error for ${inputElement.id}: ${errorMessage}`);
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);

    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _toggleButtonState() {
    console.log(`Valid inputs: ${!this._hasInvalidInput()}`);
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    console.log("Input List:", this._inputList);
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    // this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log(
          `Input changed: ${inputElement.name}, current value: ${inputElement.value}`
        );

        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.value = "";
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    console.log("Validation enabled.");
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._resetValidation();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
