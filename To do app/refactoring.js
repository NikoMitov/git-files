const addToDoBtn = document.getElementById("to-do-btn-add");

const toDoInput = document.getElementsByTagName("input")[0];

const toDoContainer = document.querySelector("#to-do-container");

const toDoContainerDone = document.querySelector("#to-do-container-done");

const toDoContainerInProgress = document.querySelector(
    "#to-do-container-in-progress"
);
let toDos = [];


function addToDo() {
    const validText = toDoInput.value.trim();
    if (validText) {
        const newToDoObj = {
            text: validText,
            completed: false,
        };
        toDos.push(newToDoObj);
        renderToDos();
        toDoInput.value = "";
    } else {
        alert("Please add some text");
    }
}

function renderToDos () {
    toDoContainerDone.innerHTML = "";
    toDoContainerInProgress.innerHTML = "";
    toDos.forEach((todo) => {
        createToDoElement(todo);
        const newToDoElement = createToDoElement(todo);
        if (todo.completed) {
            toDoContainerDone.appendChild(newToDoElement);
        } else {
            toDoContainerInProgress.appendChild(newToDoElement);
        }
    });
}

function createToDoElement(todoObj) {
    const {text, completed} = todoObj;
    const divElement = document.createElement("div");
    divElement.classList.add("to-do-instance");
    
    const pElement = document.createElement("p");
    pElement.textContent = todoObj.text;
    
  
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
        toDos = toDos.filter((el) => el.text !== 
            todoObj.text);
        divElement.remove();
    });
  

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todoObj.completed;
    checkbox.addEventListener("click", () => {
        todoObj.completed = !todoObj.completed;
        renderToDos()
    });

    divElement.appendChild(checkbox);
    divElement.appendChild(pElement);
    divElement.appendChild(deleteBtn);
  
    return divElement;
}
addToDoBtn.addEventListener("click", addToDo);
toDoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addToDo();
    }
});

