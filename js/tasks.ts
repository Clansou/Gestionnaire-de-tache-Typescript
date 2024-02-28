import { TaskInterface } from "./taskInterface";

export class Tasks implements TaskInterface {
    title: string;
    description: string;
    date: string | Date;
    priority: "high" | "medium" | "low";

    constructor(private taskInterface:TaskInterface){
        this.title = taskInterface.title;
        this.description = taskInterface.description;
        this.date = taskInterface.date;
        this.priority = taskInterface.priority;
    }

    AddTasks(task:Object):void{
        localStorage.setItem(this.taskInterface.title, JSON.stringify(task));
    }
    DisplayTasks(task:any):void{
        // Créer un élément div pour la tâche
        const taskDiv = document.createElement('div');
        taskDiv.className = `task ${task.priority}`;
        taskDiv.innerHTML = `
            <h3>${task.title} <span>– Priorité ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span></h3>
            <p>Date d'échéance: ${task.date}</p>
            <p>${task.description}</p>
            <button type="button">Supprimer</button>
            <button class="edit-btn">Modifier</button>
        `;
        // Ajouter la tâche au DOM
        document.getElementById('tasks')?.appendChild(taskDiv);
    }

}
