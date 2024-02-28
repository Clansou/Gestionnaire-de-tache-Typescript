import { TaskInterface } from "./taskInterface";
import { CreateTaskDiv } from "./taskDiv";

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
        //Création du visuelle des tâches
        CreateTaskDiv(taskDiv,task);
        // Ajouter la tâche dans l'html
        document.getElementById('tasks')?.appendChild(taskDiv);

        // Recupère le bouton delete pour pouvoir supprimer la tache 
        const deleteBtn = taskDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            this.DeleteTask(task.title,taskDiv);
        });
        const editBtn = taskDiv.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            // this.DeleteTask(task,taskDiv);
            console.log("test")
        });
    }

    // Enlève la tache lié au titre du local storage
    DeleteTask(title:string,taskDiv:HTMLDivElement){
        localStorage.removeItem(title);
        // permet d'enlever la tache de l'html sinon elle sera juste enlève du local storage et on devra raffraichir la page
        taskDiv.remove();
    }

    // Modifie la tache lié au titre du local storage
    ModifyTask(title:string,taskDiv:HTMLDivElement){
    // localStorage.setItem(title,data);
    }
        
    

}
