const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

let todos = [];

create_btn_el.addEventListener('click', CreateNewTodo);

function CreateNewTodo() {
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false
  }
  todos.unshift(item); //Add Element at the top of list.
  const { item_el, input_el } = CreateTodoElement(item);
  list_el.prepend(item_el); //Add element at start.
  input_el.removeAttribute("disabled");
  input_el.focus();
  Save();
}
// <div class="item">
// <div class="input-div">
// <input type="checkbox">
// <input class="user-input" type="text" value="Todo Content goes here">
// </div>
// <div class="actions">
// <button class="material-icons"><span class="white material-symbols-outlined">
//   edit_note
//   </span>
// </button>
// <button class="material-icons remove_btn"><span class="red material-symbols-outlined">
//     do_not_disturb_on
//   </span>
// </button>
// </div>
// </div>
function CreateTodoElement(item) {
  const item_el = document.createElement("div");
  item_el.classList.add("item");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;
  if (item.complete) {
    item_el.classList.add("complete");
  }
  const input_el = document.createElement("input");
  input_el.type = "text";
  input_el.value = item.text;
  input_el.setAttribute("disabled", "");
  const actions_el = document.createElement("div");
  actions_el.classList.add("actions");
  const edit_btn_el = document.createElement("button");
  edit_btn_el.innerHTML = '<i class="fa-solid fa-pen"></i>';
  const remove_btn_el = document.createElement("button");
  remove_btn_el.innerHTML = '<i class="fa-solid fa-trash" style="color: #e60a0a;"></i>';
  actions_el.append(edit_btn_el);
  actions_el.append(remove_btn_el);
  item_el.append(checkbox);
  item_el.append(input_el);
  item_el.append(actions_el);

  //EVENTS
  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;
    if(item.complete){
      item_el.classList.add("complete");
    }else{
      item_el.classList.remove("complete");
    }

    Save();
  });
  input_el.addEventListener("input", ()=>{
    item.text = input_el.value;
  });
  input_el.addEventListener("blur", ()=>{
    input_el.setAttribute("disabled", "");
    Save();
  });
  edit_btn_el.addEventListener("click", ()=>{
    input_el.removeAttribute("disabled");
    input_el.focus();
  });
  remove_btn_el.addEventListener("click", ()=>{
    todos = todos.filter(t => t.id != item.id);
    item_el.remove();
    Save();
  });
return { item_el, input_el, edit_btn_el, remove_btn_el }
}
function DisplayTodos(){
  Load();
  console.log(todos);
  for(let i = 0; i<todos.length; i++){
    const item = todos[i];
    const{ item_el } = CreateTodoElement(item);
    list_el.append(item_el);
  }
}

DisplayTodos();

function Save(){
  const save = JSON.stringify(todos);
  localStorage.setItem("my_todos", save);
}

function Load(){
  const data = localStorage.getItem("my_todos");

  if(data){
    todos = JSON.parse(data);
  }
}

