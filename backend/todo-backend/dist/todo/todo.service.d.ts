import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoRepository } from "./repo/todo.repository";
import { Todo } from "./entities/todo.entity";
import { UserService } from "src/user/user.service";
export declare class TodoService {
    private todoRepository;
    private userService;
    constructor(todoRepository: TodoRepository, userService: UserService);
    create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo>;
    findAllTodoByUserNotCompleted(userId: number): Promise<Todo[]>;
    findAllTodoByUserCompleted(userId: number): Promise<Todo[]>;
    update(todoId: number): Promise<import("typeorm").UpdateResult>;
    remove(todoId: number): Promise<import("typeorm").DeleteResult>;
}
