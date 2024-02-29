import { TaskInterface } from "./taskInterface";
import { CreateTaskDiv } from "./taskDiv";
import {CreateFormDiv} from"./formDiv";

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

    UpdateTasks(task:Object):void{
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
            this.ModifyForm(task,taskDiv);
        });
    }

    // Enlève la tache lié au titre du local storage
    DeleteTask(title:string,taskDiv:HTMLDivElement){
        localStorage.removeItem(title);
        // permet d'enlever la tache de l'html sinon elle sera juste enlève du local storage et on devra raffraichir la page
        taskDiv.remove();
    }
    // Modifie la tache lié au titre du local storage
    ModifyForm(task:any,taskDiv:HTMLDivElement){
        // localStorage.setItem(title,data);
        CreateFormDiv(taskDiv,task)

        let formModifyTask = document.getElementById('taskFormModify');
        let buttonModifyTask = document.getElementById('ModifyTask')
        // recupère les élément au submit pour pouvoir les ajouter créer une nouvelle tache
        
        buttonModifyTask?.addEventListener("click" , (event) => {
            let taskTitle = (formModifyTask.querySelector('#taskTitle') as HTMLInputElement).value;
            let taskDescription = (formModifyTask.querySelector('#taskDescription') as HTMLInputElement).value;
            let taskDueDate = (formModifyTask.querySelector('#taskDueDate') as HTMLInputElement).value;
            let taskPriority = (formModifyTask.querySelector('#taskPriority') as HTMLSelectElement).value;
            let taskObject: TaskInterface = {
                title: taskTitle,
                description: taskDescription,
                date: taskDueDate,
                priority: taskPriority
            };
            console.log(taskTitle);
            let tasks = new Tasks(taskObject);
            tasks.UpdateTasks(taskObject);
            CreateTaskDiv(taskDiv,tasks)
        })
    }
        
    

}
