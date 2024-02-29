import { TaskInterface } from "./taskInterface";
import { CreateTaskDiv } from "./taskDiv";
import {CreateFormDiv} from"./formDiv";

export class Tasks implements TaskInterface  {


    constructor(private title: string,private description: string,private date: string | Date,private priority: "high" | "medium" | "low"){
    }

    UpdateTasks(task:Object):void{
        localStorage.setItem(this.title, JSON.stringify(task));
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
        deleteBtn?.addEventListener('click', () => {
            this.DeleteTask();
            taskDiv.remove();
        });
        const editBtn = taskDiv.querySelector('.edit-btn');
        editBtn?.addEventListener('click', () => {
            this.ModifyForm(task,taskDiv);
        });
    }

    // Enlève la tache lié au titre du local storage
    DeleteTask(){
        localStorage.removeItem(this.title);
        // permet d'enlever la tache de l'html sinon elle sera juste enlève du local storage et on devra raffraichir la page
    }
    // Modifie la tache lié au titre du local storage
    ModifyForm(task:any,taskDiv:HTMLDivElement){
        // localStorage.setItem(title,data);
        CreateFormDiv(taskDiv,task)

        let formModifyTask = document.getElementById('taskFormModify');
        let buttonModifyTask = document.getElementById('ModifyTask')
        // recupère les élément au submit pour pouvoir les ajouter créer une nouvelle tache
        
        buttonModifyTask?.addEventListener("click" , (event) => {
            task.DeleteTask();
            let taskTitle = (formModifyTask?.querySelector('#taskTitle') as HTMLInputElement).value;
            let taskDescription = (formModifyTask?.querySelector('#taskDescription') as HTMLInputElement).value;
            let taskDueDate = (formModifyTask?.querySelector('#taskDueDate') as HTMLInputElement).value;
            let taskPriority = (formModifyTask?.querySelector('#taskPriority') as HTMLSelectElement).value;
            let taskObject = {
                title: taskTitle,
                description: taskDescription,
                date: taskDueDate,
                priority: taskPriority as "high" | "medium" | "low"
            };
            console.log(taskTitle);
            let tasks = new Tasks(taskTitle,taskDescription,taskDueDate,taskPriority as "high" | "medium" | "low");
            tasks.UpdateTasks(taskObject);
            CreateTaskDiv(taskDiv,tasks); 
        })
    }
        
    

}
