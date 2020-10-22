class List {
    constructor(name, selector) {
        this.name = name;
        this.selector = selector;
        this.target = document.querySelector(this.selector);
        this.items = [];
    }

    addItem(value) {
        this.items.push({name: value, done: false});
        this.render();
    }

    editItem(value, index) {
        this.items[index].name = value;
        this.render();
    }

    deleteItem(index) {
        this.items.splice(index, 1);
        this.render();
    }

    render() {
        let ul = document.createElement("ul");
        ul.classList.add("list-group", "taskList");
        this.items.forEach((item, index) => {
            let checkboxAttribute;
            item.done ? checkboxAttribute = "checked" : checkboxAttribute = ""

            let li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "mb-1", "mt-1", "pt-2", "pr-1", "pb-2");
            li.innerHTML = 
            `<span>
                <span>
                    <input type="checkbox" aria-label="Checkbox for following text input" class="checkbox" id="c-${index}" ${checkboxAttribute}/>
                </span>
                <span class="pl-3 taskText" id="t-${index}">
                    ${item.name}
                </span>
            </span>
            <span>
                <button type="button" class="btn pr-1 edButton" id="e-${index}">
                    <i class="far fa-edit buttonIcon"></i>
                </button>
                <button type="button" class="btn edButton" id="d-${index}">
                    <i class="far fa-trash-alt buttonIcon"></i>
                </button>
            </span>`;
            ul.appendChild(li);
        })
        this.target.innerHTML = "";
        this.target.appendChild(ul);

        let numberOfTasksDone = 0;
        this.items.forEach((item) => {
            if (item.done) {
                numberOfTasksDone ++;
            }
        })
       
        this.target.parentElement.children[1].innerHTML = `Tasks done: ${numberOfTasksDone}/${this.items.length}`
    }
}