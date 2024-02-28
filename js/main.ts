import { Tasks } from "./tasks";

let formAddTask = document.getElementById('taskForm');

formAddTask?.addEventListener("submit" , (event) => {
    let taskTitle = (document.getElementById('taskTitle')as HTMLInputElement).value;
    let taskDescription = (document.getElementById('taskDescription') as HTMLInputElement).value;
    let taskDueDate = (document.getElementById('taskDueDate') as HTMLInputElement).value;
    let taskPriority = (document.getElementById('taskPriority') as HTMLInputElement).value;
    let tasks = new Tasks(taskTitle,taskDescription,taskDueDate,taskPriority);
    tasks.AddTasks();
    
})