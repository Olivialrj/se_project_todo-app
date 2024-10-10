class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    console.log("open");

    this._popup.classList.add("popup_visible");
    console.log("Adding Escape key listener");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    console.log("close");

    this._popup.classList.remove("popup_visible");
    console.log("Removing Escape key listener");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    console.log("Key pressed: ", evt.key);
    if (evt.key === "Escape") {
      console.log("Escape key pressed");
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
