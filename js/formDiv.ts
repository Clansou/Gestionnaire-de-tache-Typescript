export function CreateFormDiv(taskDiv:HTMLDivElement,task:any){
    taskDiv.innerHTML = `            <div id="taskFormModify">
    <input type="text" id="taskTitle" class="taskTitle" placeholder="Titre de la tâche" value=${task.title} required>
    <textarea id="taskDescription" placeholder="Description de la tâche" >${task.description}</textarea>
    <input type="date" value=${task.date} id="taskDueDate">
    <select id="taskPriority">
        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Faible</option>
        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Moyenne</option>
        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>Haute</option>
    </select>
    <button id="ModifyTask">Modifier ma tâche</button>
    </div>`;
}