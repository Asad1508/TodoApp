import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(createTodoDto: CreateTodoDto, userId: number): Promise<import("./entities/todo.entity").Todo>;
    findAllTodosByUserIdNotCompleted(userId: number): Promise<import("./entities/todo.entity").Todo[]>;
    findAllTodosByUserIdCompleted(userId: number): Promise<import("./entities/todo.entity").Todo[]>;
    update(id: number): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
