import { TaskInterface } from "./taskInterface";
import { CreateTaskDiv } from "./taskDiv";
import {CreateFormDiv} from"./formDiv";

export class TasksManager implements TaskInterface  {


    constructor(private title: string ="",private description: string ="",private date: string | Date ="",private priority: "high" | "medium" | "low",private category: string[]){
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
        let deleteBtn = taskDiv.querySelector('.delete-btn');
        deleteBtn?.addEventListener('click', () => {
            this.DeleteTask();
            taskDiv.remove();
        });
        let editBtn = taskDiv.querySelector('.edit-btn');
        editBtn?.addEventListener('click', () => {
            this.ModifyForm(task,taskDiv);
        });
    }

    // Enlève la tache lié au titre du local storage
    DeleteTask():void{
        localStorage.removeItem(this.title);
        // permet d'enlever la tache de l'html sinon elle sera juste enlève du local storage et on devra raffraichir la page
    }
    // Modifie la tache lié au titre du local storage
    ModifyForm(task:any,taskDiv:HTMLDivElement){
        CreateFormDiv(taskDiv,task)

        let formModifyTask = document.getElementById('taskFormModify');
        let buttonModifyTask = document.getElementById('ModifyTask')
        // recupère les élément au submit pour pouvoir les ajouter créer une nouvelle tache
        
        buttonModifyTask?.addEventListener("click" , (event) => {
            task.DeleteTask();
            let taskTitle = (formModifyTask?.querySelector('#taskTitle') as HTMLInputElement) ? (formModifyTask?.querySelector('#taskTitle') as HTMLInputElement).value : "";
            let taskDescription = (formModifyTask?.querySelector('#taskDescription') as HTMLInputElement)  ? (formModifyTask?.querySelector('#taskDescription') as HTMLInputElement).value : "";
            let taskDueDate = (formModifyTask?.querySelector('#taskDueDate') as HTMLInputElement) ? (formModifyTask?.querySelector('#taskDueDate') as HTMLInputElement).value : "";
            let taskPriority = (formModifyTask?.querySelector('#taskPriority') as HTMLSelectElement) ? (formModifyTask?.querySelector('#taskPriority') as HTMLSelectElement).value : "";
            let taskCategory = (formModifyTask?.querySelector('#taskCategory') as HTMLInputElement) ? (formModifyTask?.querySelector('#taskCategory') as HTMLInputElement).value.split(',') : [];
            console.log(formModifyTask?.querySelector('#taskCategory'));
            let taskObject = {
                title: taskTitle,
                description: taskDescription,
                date: taskDueDate? taskDueDate : null,
                priority: taskPriority as "high" | "medium" | "low",
                category: taskCategory
            };
            let tasks = new TasksManager(taskTitle, taskDescription, taskDueDate, taskPriority as "high" | "medium" | "low", taskCategory);
            tasks.UpdateTasks(taskObject);
            CreateTaskDiv(taskDiv,tasks); 
                    // Recupère le bouton delete pour pouvoir supprimer la tache 
            let deleteBtn = taskDiv.querySelector('.delete-btn');
            deleteBtn?.addEventListener('click', () => {
                this.DeleteTask();
                taskDiv.remove();
            });
            let editBtn = taskDiv.querySelector('.edit-btn');
            editBtn?.addEventListener('click', () => {
                this.ModifyForm(task,taskDiv);
            });
        })
    }
        
    

}
