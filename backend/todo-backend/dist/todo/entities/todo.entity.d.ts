import { User } from "src/auth/entities/user.entity";
export declare class Todo {
    id: number;
    title: string;
    date: string;
    completed: boolean;
    user: User;
}
