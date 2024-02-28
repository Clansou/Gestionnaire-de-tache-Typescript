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
        // Créer un élément div pour la tâche toutes ses infos html
        const taskDiv = document.createElement('div');
        taskDiv.className = `task ${task.priority} ${task.title}`;
        taskDiv.innerHTML = `
            <h3>${task.title} <span>– Priorité ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span></h3>
            <p>Date d'échéance: ${task.date}</p>
            <p>${task.description}</p>
            <button class="delete-btn" type="button">Supprimer</button>
            <button class="edit-btn">Modifier</button>
        `;
        // Ajouter la tâche dans l'html
        document.getElementById('tasks')?.appendChild(taskDiv);

        // Recupère le bouton delete pour pouvoir supprimer la tache 
        const deleteBtn = taskDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            this.DeleteTask(task.title,taskDiv);
        });
    }

    // Enlève la tache lié au titre du local storage
    DeleteTask(title:string,taskDiv:HTMLDivElement){
        localStorage.removeItem(title);
        // permet d'enlever la tache de l'html sinon elle sera juste enlève du local storage et on devra raffraichir la page
        taskDiv.remove();
    }
    

}
