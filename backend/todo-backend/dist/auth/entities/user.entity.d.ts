import { Todo } from "src/todo/entities/todo.entity";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    enabled: boolean;
    todos: Todo[];
    hashPassword(): Promise<void>;
}
