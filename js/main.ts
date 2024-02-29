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


function displayTasks(filterFunction?: (taskData: any) => boolean): void {
    const ListTask = document.getElementById('tasks');
    while (ListTask?.firstChild) {
        ListTask.removeChild(ListTask.firstChild);
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const taskData = JSON.parse(localStorage.getItem(key) as string);
            if (!filterFunction || filterFunction(taskData)) {
                const tasks = new Tasks(taskData.title, taskData.description, taskData.date, taskData.priority as "high" | "medium" | "low");
                tasks.DisplayTasks(tasks);
            }
        }
    }
}

displayTasks();

function FilterTask(): void {
    const filterPriority = (document.getElementById('filterPriority') as HTMLSelectElement).value;
    const filterDate = (document.getElementById('filterDate') as HTMLInputElement).value;
    const searchKeyword = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();

    displayTasks((taskData) => {
        return (filterPriority === "all" || taskData.priority === filterPriority) && (!filterDate || taskData.date === filterDate) && taskData.title.toLowerCase().includes(searchKeyword);
    });
}

// Event listeners
document.getElementById('applyFilter')?.addEventListener("click", FilterTask);
document.getElementById('searchButton')?.addEventListener('click', FilterTask);