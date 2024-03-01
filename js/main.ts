import { TasksManager } from "./tasksManager";

let formAddTask = document.getElementById('taskForm');
// recupère les élément au submit pour pouvoir les ajouter créer une nouvelle tache
formAddTask?.addEventListener("submit" , (event) => {
    let taskTitle = (document.getElementById('taskTitle')as HTMLInputElement).value;
    let taskDescription = (document.getElementById('taskDescription') as HTMLInputElement).value;
    let taskDueDate = (document.getElementById('taskDueDate') as HTMLInputElement).value;
    let taskPriority = (document.getElementById('taskPriority') as HTMLInputElement).value;
    let taskCategory = (document.getElementById('taskCategory') as HTMLInputElement).value.split(',');
    let tasks = new TasksManager(taskTitle, taskDescription, taskDueDate, taskPriority as "high" | "medium" | "low", taskCategory);
    tasks.UpdateTasks(tasks);
})


function displayTasks(filterFunction?: (taskData: any) => boolean): void {
    let ListTask = document.getElementById('tasks');
    while (ListTask?.firstChild) {
        ListTask.removeChild(ListTask.firstChild);
    }

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key) {
            let taskData = JSON.parse(localStorage.getItem(key) as string);
            if (!filterFunction || filterFunction(taskData)) {
                let tasks = new TasksManager(taskData.title, taskData.description, taskData.date, taskData.priority as "high" | "medium" | "low",taskData.category);
                tasks.DisplayTasks(tasks);
            }
        }
    }
}

displayTasks();

function FilterTask(): void {
    const filterPriority = (document.getElementById('filterPriority') as HTMLSelectElement).value;
    const filterDate = (document.getElementById('filterDate') as HTMLInputElement).value;
    const filterCategory = Array.from((document.getElementById('filterCategory') as HTMLSelectElement)?.selectedOptions || []).map((option: HTMLOptionElement) => option.value);
    const searchKeyword = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();

    displayTasks((taskData) => {
        let categoryMatches = filterCategory.length === 0 || filterCategory.some(category => taskData.category.includes(category));
        return (filterPriority === "all" || taskData.priority === filterPriority) && (!filterDate || taskData.date === filterDate) && categoryMatches && taskData.title.toLowerCase().includes(searchKeyword);
    });
}

function CategorySelect(): void {
    const select = document.getElementById('filterCategory') as HTMLSelectElement;
    select.innerHTML = ''; // Clear existing options

    let categories = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key) {
            let taskData = JSON.parse(localStorage.getItem(key) as string);
            taskData.category.forEach((category:string)=> categories.add(category));
        }
    }

    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
}

// Call this function when the page loads and whenever tasks are added or removed
CategorySelect();

// Event listeners
document.getElementById('applyFilter')?.addEventListener("click", FilterTask);
document.getElementById('searchButton')?.addEventListener('click', FilterTask);
