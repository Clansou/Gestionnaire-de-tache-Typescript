export interface TaskInterface {
    title: string;
    description: string;
    date: string | Date;
    priority: "high" | "medium" | "low";
}
