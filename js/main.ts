import { Tasks } from "./tasks";
import { TaskInterface } from "./taskInterface";


let formAddTask = document.getElementById('taskForm');
// recupère les élément au submit pour pouvoir les ajouter créer une nouvelle tache
formAddTask?.addEventListener("submit" , (event) => {
    let taskTitle = (document.getElementById('taskTitle')as HTMLInputElement).value;
    let taskDescription = (document.getElementById('taskDescription') as HTMLInputElement).value;
    let taskDueDate = (document.getElementById('taskDueDate') as HTMLInputElement).value;
    let taskPriority = (document.getElementById('taskPriority') as HTMLInputElement).value;
    let tasks = new Tasks(taskTitle,taskDescription,taskDueDate,taskPriority as "high" | "medium" | "low");
    tasks.UpdateTasks(tasks);
})


// fait une boucle en fonction des éléments stocké en local storage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
        // Crée une tache pour chaque élément du local storage et appelle une fonction pour l'afficher
        const taskData = JSON.parse(localStorage.getItem(key) as string);
        const { title, description, date, priority } = taskData;
        const tasks = new Tasks(title, description, date, priority as "high" | "medium" | "low");
        tasks.DisplayTasks(tasks);
    }
}

let buttonFilter = document.getElementById('applyFilter');
buttonFilter?.addEventListener("click", (event) =>{
    let tasks = FilterTask();
})

function FilterTask():void{
    const ListTask = document.getElementById('tasks');
    while (ListTask?.firstChild) {
        ListTask.removeChild(ListTask.firstChild);
    }
    const filterPriority = (document.getElementById('filterPriority') as HTMLSelectElement).value;
    const filterDate = (document.getElementById('filterDate') as HTMLInputElement).value;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            // Parse the JSON string from localStorage into an object
            const taskData = JSON.parse(localStorage.getItem(key) as string);
            // Check if the task matches the filter criteria
            if (filterPriority === "all" || taskData.priority === filterPriority) {
                if (!filterDate || taskData.date === filterDate) {
                    // Create a new Tasks instance using the extracted properties
                    const tasks = new Tasks(taskData.title, taskData.description, taskData.date, taskData.priority as "high" | "medium" | "low");
                    // Display the task
                    tasks.DisplayTasks(tasks);
                }
            }
        }
    }
}

console.log(localStorage);

