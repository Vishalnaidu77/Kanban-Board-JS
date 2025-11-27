let taskData = {};

const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll('.task')

if(localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"))
    
    for (const col in data) {
        console.log(col, data[col]);
    }
    
}

let draggedItem = null;

tasks.forEach((task) => {
    task.addEventListener("drag", (e) => {
        // console.log(e);
        draggedItem = task;
    })
})

const columns = [todo, progress, done];

function taskCount(){
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        count.innerText = tasks.length;
    })
}


function addDragEventOncolumn(cols){
    cols.addEventListener("dragenter", (e) => {
        e.preventDefault();
        cols.classList.add("hover-over")
        // console.log(`Element enter in ${cols}`);
    })

    cols.addEventListener("dragleave", (e) => {
        e.preventDefault();
        cols.classList.remove("hover-over")
    })

    cols.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    cols.addEventListener("drop", (e) => {
        e.preventDefault()
        // console.log(draggedItem);
        cols.appendChild(draggedItem)
        cols.classList.remove("hover-over")

        taskCount()
    })
    
}


// Modal Logic

const toggleModal = document.querySelector("#toggle-modal")
const modal = document.querySelector(".modal")
const modalBg = document.querySelector(".bg")
const addNewTask = document.querySelector(".modal #add-new-task")

addDragEventOncolumn(todo)
addDragEventOncolumn(progress)
addDragEventOncolumn(done)

toggleModal.addEventListener("click", () => {
    modal.classList.toggle("active")
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})

function addTask() {
    const taskTitle = document.querySelector("#task-title").value
    const taskDesc = document.querySelector("#task-desc").value

    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button>Delete</button>
    `

    todo.appendChild(div)

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right")

        taskData[col.id] = Array.from(tasks).map(t => {
           return {
            title : t.querySelector("h2").innerText,
            desc : t.querySelector("p").innerText
           }
        })

        localStorage.setItem("tasks", JSON.stringify(taskData))
        count.innerText = tasks.length;
    })

    div.addEventListener("drag", (e) => {
        draggedItem = div;
    })

    modal.classList.remove("active")
}

addNewTask.addEventListener("click", () => {addTask()})
document.addEventListener("keydown",(e) => {
    if(modal.classList.contains("active")){
        e.key === "Enter" ? addTask() : '';
    }
})

