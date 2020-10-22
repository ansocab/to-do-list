let addTaskButton = document.querySelector(".addTaskButton");
let body = document.querySelector("body");
let listContainer = document.querySelector(".listContainer");
let titleInputForm = document.querySelector(".titleInputForm");
let titleInput = document.querySelector(".titleInput");
let todoList;
let userInputForm;
let userInput;
let validateButton;
let myList = new List("My List", ".listContainer");
myList.render();

edButtonsAddEvHandler();
checkboxAddEvHandler();

// ADD LIST TITLE
const textFieldTemplate = `
<li class="list-group-item d-flex justify-content-between align-items-center mb-1 mt-1 pt-1 pr-1 pb-1 textFieldListItem">
    <form class="pl-4 ml-2 taskText userInputForm">
        <input type="text" id="newToDoInput" class="mt-2 mb-2"/>
    </form>
    <div>
        <button type="button" class="btn pt-0 pb-0 mt-0 mb-0 validateButton buttonIcon" style="display: none">
            <i class="fas fa-plus-circle"></i>
        </button>
    </div>
</li>
`

titleInputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    titleInput.blur();
});


// ADD NEW TASK
addTaskButton.addEventListener("click", showTextField);

function showTextField() {
    todoList = document.querySelector(".taskList");
    addTaskButton.style.display = "none";
    todoList.innerHTML += textFieldTemplate;
    
    userInput = document.querySelector("#newToDoInput");
    userInput.focus();
    addInputEventListeners();

    body.addEventListener("click", function(event) {
        if (event.target !== userInput && event.target !== addTaskButton && !userInput.value) {
            resetNewTaskField();
        }
    })

    console.log(myList);
}

function addInputEventListeners() {
    validateButton = document.querySelector(".validateButton");
    userInputForm = document.querySelector(".userInputForm");
    
    userInput.addEventListener("input", function() {
        validateButton.style.display = "inline";
        userInput.placeholder = "";
    })

    userInputForm.addEventListener("submit", handleSubmit);
    validateButton.addEventListener("click", handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    if(userInput.value) {
        myList.addItem(userInput.value);
        edButtonsAddEvHandler();
        checkboxAddEvHandler()
        addTaskButton.style.display = "block";
    }
}

function resetNewTaskField() {
    const textFieldListItem = document.querySelector(".textFieldListItem");
    if (textFieldListItem) {
        todoList.removeChild(textFieldListItem);
        addTaskButton.style.display = "block";
    }
    edButtonsAddEvHandler();
    checkboxAddEvHandler()
}


// EDIT AND DELETE TASKS
    function edButtonsAddEvHandler() {
        let editDeleteButtons = document.querySelectorAll(".edButton");
        editDeleteButtons.forEach((button) => {
            button.onclick = this.handleClick;
        })
    }

    function handleClick() {
        const buttonIndex = this.id.split("-")[1];
        if (this.id.includes("d")) {
            myList.deleteItem(buttonIndex);
            edButtonsAddEvHandler();
        } else {
            prepareEditItem(buttonIndex)
            edButtonsAddEvHandler();
        }
    }

    function prepareEditItem(index) {
        let taskTextElement = document.querySelector(`#t-${index}`);
        taskTextElement.innerHTML = 
        `<form class="d-inline editUserInput">
            <input type="text" class="mt-1 mb-1" value="${myList.items[index].name}"></input>
        </form>`

        const editUserInput = document.querySelector(".editUserInput");
        editUserInput.addEventListener("submit", (event) => {
            event.preventDefault();
            const newUserInput = document.querySelector(".editUserInput input");
            myList.editItem(newUserInput.value, index);
            edButtonsAddEvHandler();
        })
    }

    // CHECKBOX
    function checkboxAddEvHandler() {
        let checkboxes = document.querySelectorAll(".checkbox")
        checkboxes.forEach((box) => {
            box.onchange = this.handleCheck;
        });
    }

    function handleCheck() {
        const checkboxIndex = this.id.split("-")[1];
        let taskDone = myList.items[checkboxIndex].done;
        taskDone ? myList.items[checkboxIndex].done = false : myList.items[checkboxIndex].done = true;
        myList.render();
        checkboxAddEvHandler();
    }