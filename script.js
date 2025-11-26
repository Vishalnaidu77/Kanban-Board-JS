const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll('.task')


// console.log(todo, progress, done);

let draggedItem = null;

tasks.forEach((task) => {
    task.addEventListener("drag", (e) => {
        // console.log(e);
        draggedItem = task;
    })
})


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


addNewTask.addEventListener("click", () => {
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

    div.addEventListener("drag", (e) => {
        draggedItem = div;
    })

    modal.classList.remove("active")
})
