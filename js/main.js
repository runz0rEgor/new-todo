const form = document.querySelector(".form");
const form_input = document.querySelector(".form__input");
const todo_wrapper = document.querySelector(".todo-wrapper");
const todo_list = document.querySelector(".todo__list");
const filters = document.querySelector(".filters");
const counter = document.querySelector(".counter");
const searchInput = document.querySelector(".search");

const todos = [];

function Todo(description) {
  this.description = description;
  this.checked = false;
}

const addTodoToHtml = () => {
  todo_list.innerHTML = "";
  if (todos.length) {
    todos.forEach((item, index) => {
      todo_list.innerHTML += createNewTodo(item, index);
    });
    filters.style.display = "flex";
  } else {
    filters.style.display = "none";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form_input.value !== "") {
    todos.push(new Todo(form_input.value));
  }
  addTodoToHtml();
  count();
  form_input.value = "";
});

const createNewTodo = (todo, index) => {
  return `
      <li class="list-item">
        <input class="todo-input" onclick="todoCheked(${index})" type="checkbox" ${
    todo.checked ? "checked" : ""
  }>
        <label class='label ${todo.checked ? "checked" : ""}'>${
    todo.description
  }</label>
        <button onclick="deleteTodo(${index})">delete</button>
       </li>
  `;
};

const todoCheked = (index) => {
  console.log(index);
  todos[index].checked = !todos[index].checked;
  addTodoToHtml();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  count();
  addTodoToHtml();
};

const count = () => {
  counter.innerHTML = `${todos.length} items left`;
};

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  hideTodos(e.target.value);
});

const hideTodo = (obj) => {
  obj.classList.add("hide");
};

const showTodo = (obj) => {
  obj.classList.remove("hide");
};

const hideTodos = (text) => {
  const todos = document.querySelectorAll(".list-item");
  const regex = new RegExp(text.toLowerCase(), "g");
  todos.forEach((item) => {
    const label = item.querySelector(".label");
    if (!label.innerText.toLowerCase().match(regex)) {
      hideTodo(item);
    } else {
      showTodo(item);
    }
  });
};
