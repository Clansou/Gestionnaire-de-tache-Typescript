export function CreateTaskDiv(taskDiv:HTMLDivElement,task:any){
    taskDiv.className = `task ${task.priority} ${task.title}`;
    taskDiv.innerHTML = `
        <h3>${task.title} <span>– Priorité ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span></h3>
        <p>Date d'échéance: ${task.date}</p>
        <p>${task.description}</p>
        <button class="delete-btn" type="button">Supprimer</button>
        <button class="edit-btn">Modifier</button>
    `;
}