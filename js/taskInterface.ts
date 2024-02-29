export interface TaskInterface {
    UpdateTasks:(task:Object)=>void

    DisplayTasks: (task:any)=>void
    DeleteTask:()=>void
    
    ModifyForm:(task:any,taskDiv:HTMLDivElement)=>void
}
