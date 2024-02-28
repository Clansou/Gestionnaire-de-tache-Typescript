import { Tasks } from "./tasks";
import { TaskInterface } from "./taskInterface";


let formAddTask = document.getElementById('taskForm');
// recupère les élément au submit pour pouvoir les ajouter créer une nouvelle tache
formAddTask?.addEventListener("submit" , (event) => {
    let taskTitle = (document.getElementById('taskTitle')as HTMLInputElement).value;
    let taskDescription = (document.getElementById('taskDescription') as HTMLInputElement).value;
    let taskDueDate = (document.getElementById('taskDueDate') as HTMLInputElement).value;
    let taskPriority = (document.getElementById('taskPriority') as HTMLInputElement).value;
    let taskObject: TaskInterface = {
        title: taskTitle,
        description: taskDescription,
        date: taskDueDate,
        priority: taskPriority
    };
    let tasks = new Tasks(taskObject);
    tasks.AddTasks(tasks);
})



// fait une boucle en fonction des éléments stocké en local storage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
        // Crée une tache pour chaque élément du local storage et appelle une fonction pour l'afficher
        const task = new Tasks(JSON.parse(localStorage.getItem(key) as string));
        task.DisplayTasks(task);
    }
}


console.log(localStorage);

