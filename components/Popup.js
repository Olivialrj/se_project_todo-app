class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open(popupSelector) {
    popupSelector.classList.add(this._popup);
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close(popupSelector) {
    popupSelector.classList.remove(this._popup);
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      close();
    }
  }

  _setEventListeners() {
    const closePopup = doucment.querySelector(".popup__close");
    closePopup.addEventListener("click", () => {
      close();
    });
    const popupContainer = document.querySelectorAll(".popup");
    popupContainer.forEach((container) => {
      container.addEventListener("click", function (evt) {
        if (evt.target === container) {
          close();
        }
      });
    });
  }
}

export default Popup;
