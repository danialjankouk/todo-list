const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
document.addEventListener("DOMContentLoaded", getLocalTodos);

function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `<li>${todoInput.value}</li>
  <span><i class="far fa-trash-alt"></i></span>
  <span><i class="far fa-check-square"></i></span>`;

  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function checkRemove(e) {
  const classList = { ...e.target.classList };
  const item = e.target;
  console.log(item.parentElement.parentElement);
  if (classList[1] === "fa-check-square") {
    const check = item.parentElement.parentElement;
    check.classList.toggle("completed");
  } else if (classList[1] === "fa-trash-alt") {
    const trash = item.parentElement.parentElement;
    removeLocalTodos(trash);
    trash.remove();
  }
}

//localStorage
function saveLocalTodos(todo) {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  saveTodos.push(todo);

  localStorage.setItem("todos", JSON.stringify(saveTodos));
}
function getLocalTodos() {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  saveTodos.forEach((todos) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todos}</li>
          <span><i class="far fa-trash-alt"></i></span>
          <span><i class="far fa-check-square"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterTodos = saveTodos.filter((t) => t !== todo.children[0].innerText);
  localStorage.setItem("todos", JSON.stringify(filterTodos));
}
