export class Tasks {
    constructor(private title:string, private description:string, private date:string, private priority:string){

    }

    AddTasks(){
        console.log(`${this.title} ${this.description} ${this.date} ${this.priority}`);
    }
}
