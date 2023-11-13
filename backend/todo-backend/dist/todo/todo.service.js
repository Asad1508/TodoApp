"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const todo_repository_1 = require("./repo/todo.repository");
const todo_entity_1 = require("./entities/todo.entity");
const user_service_1 = require("../user/user.service");
let TodoService = class TodoService {
    constructor(todoRepository, userService) {
        this.todoRepository = todoRepository;
        this.userService = userService;
    }
    async create(createTodoDto, userId) {
        try {
            let todo = new todo_entity_1.Todo();
            todo.title = createTodoDto.title;
            todo.date = new Date().toLocaleString();
            todo.completed = false;
            todo.user = await this.userService.findUserById(userId);
            return await this.todoRepository.save(todo);
        }
        catch (error) { }
    }
    async findAllTodoByUserNotCompleted(userId) {
        try {
            return await this.todoRepository.find({
                relations: ["user"],
                where: { user: { id: userId }, completed: false },
            });
        }
        catch (error) { }
    }
    async findAllTodoByUserCompleted(userId) {
        try {
            return await this.todoRepository.find({
                relations: ["user"],
                where: { user: { id: userId }, completed: true },
            });
        }
        catch (error) { }
    }
    async update(todoId) {
        try {
            return await this.todoRepository.update(todoId, { completed: true });
        }
        catch (error) { }
    }
    async remove(todoId) {
        try {
            return await this.todoRepository.delete(todoId);
        }
        catch (error) { }
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todo_repository_1.TodoRepository,
        user_service_1.UserService])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map