class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    //id, name, completed, date
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._templateElement = document.querySelector(selector);
    this._id = data.id;
    this._completed = data.completed;
    this._name = data.name;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
    });
    this._todoCheckBoxEl = this._todoElement.querySelector(".todo__completed");
    this._todoCheckBoxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _generateNameEl() {
    this._nameEl = this._todoElement.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _generateDates() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }
  _toggleCompletion = () => {
    this._completed = !this._completed;
    this._handleCheck(this._completed);
  };

  _remove = () => {
    this._todoElement.remove();
    this._todoElement = null;
  };

  getView() {
    this._todoElement = this._getTemplate();
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._name;
    this._generateDates();
    this._generateCheckBoxEl();
    this._generateNameEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
