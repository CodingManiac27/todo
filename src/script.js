document.addEventListener('DOMContentLoaded', () => {
const taskinput = document.getElementById("input");
const addtask = document.getElementById("addtask");
const tasklist = document.getElementById("tasklist");

let tasks = JSON.parse(localStorage.getItem("tasks_list")) || []; 
showtasks(tasks)

function showtasks(tasks){
    tasklist.innerHTML = '';
    tasks.forEach(task => rendertasks(task))
}

addtask.addEventListener('click', () => {
    let taskname = taskinput.value.trim();

    if (taskname !== '') {

        let taskobj = {
            name: taskname,
            id: Date.now(),
            completed: false
        };
        
        tasks.push(taskobj); 
        taskinput.value = ''; 
        savetasks();
    }

});


function rendertasks(task){

    if(!task.completed){
        const taskdiv = document.createElement("div");
        taskdiv.setAttribute("task-id", task.id)
        taskdiv.innerHTML = `
        <div class="flex justify-between items-center w-full">

            <div class="flex items-center w-full my-2">
                <input type="checkbox" id="agree" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                <label for="agree" class="text-white text-lg cursor-pointer mx-4">${task.name}</label>
            </div>

            <button class="bg-red-500 hover:bg-red-600 text-white text-sm mx-4 px-4 py-1 rounded"> Delete </button>

        </div>
        `

        taskdiv.querySelector('button').addEventListener('click', () => {
            task.completed = !task.completed
            showtasks(tasks)
        })

        tasklist.appendChild(taskdiv)
    }   
}

function savetasks(){
    localStorage.setItem('tasks_list', JSON.stringify(tasks))
    showtasks(tasks)
}

console.log("hello")

})