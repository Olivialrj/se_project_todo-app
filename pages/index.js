import { v4 as uuidv4 } from "http://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js/";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const validator = new FormValidator(validationConfig, addTodoForm);

const section = new Section({
  item: initialTodos,
  renderer: () => {
    const todo = generateTodo(item);
    todosList.append(todo);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const popupModal = new Popup({ popupSelector: ".popup_visible" });

const addTodoPopupModal = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleSubmit: (inputValues) => {
    addTodoForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const name = evt.target.name.value;
      const dateInput = evt.target.date.value;

      // Create a date object and adjust for timezone
      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      const id = uuidv4();
      const values = { name, date, id };
      const todo = generateTodo(values);
      todosList.append(todo);
      closeModal(addTodoPopup);
      // validator.resetValidation();
    });
  },
});
addTodoPopupModal.setEventListeners();

const todoCounter = new TodoCounter({
  todos: initialTodos,
  selector: ".counter__text",
});
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// initialTodos.forEach((item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// });

validator.enableValidation();
