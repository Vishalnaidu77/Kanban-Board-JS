const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll('.task')

console.log(todo, progress, done);

tasks.forEach((task) => {
    task.addEventListener("drag", (e) => {
        // console.log(e);
    })
})


function addDragEventOncolumn(cols){
    cols.addEventListener("dragenter", (e) => {
        e.preventDefault();
        cols.classList.add("hover-over")
    })

    cols.addEventListener("dragleave", (e) => {
        e.preventDefault();
        cols.classList.remove("hover-over")
    })
}

addDragEventOncolumn(todo)
addDragEventOncolumn(progress)
addDragEventOncolumn(done)