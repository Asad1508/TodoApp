import { Todo } from 'src/todo/entities/todo.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    todos: Todo[];
}
