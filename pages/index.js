import { v4 as uuidv4 } from "http://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const validator = new FormValidator(validationConfig, addTodoForm);

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const todoCounter = new TodoCounter({
  todos: initialTodos,
  selector: ".counter__text",
});

const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      renderTodo(item);
    },
  },
  ".todos__list"
);

section.renderItems();

const addTodoPopupModal = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id, completed: false };
    renderTodo(values);

    addTodoPopupModal.close();
    todoCounter.updateTotal(true);
  },
});
addTodoPopupModal.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopupModal.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopupModal.close();
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);

  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

// The logic in this function should all be handled in the Todo class.

// initialTodos.forEach((item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// });

validator.enableValidation();
