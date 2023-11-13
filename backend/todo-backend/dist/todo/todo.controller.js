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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const swagger_1 = require("@nestjs/swagger");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    create(createTodoDto, userId) {
        return this.todoService.create(createTodoDto, Number(userId));
    }
    findAllTodosByUserIdNotCompleted(userId) {
        return this.todoService.findAllTodoByUserNotCompleted(Number(userId));
    }
    findAllTodosByUserIdCompleted(userId) {
        return this.todoService.findAllTodoByUserCompleted(Number(userId));
    }
    update(id) {
        return this.todoService.update(Number(id));
    }
    remove(id) {
        return this.todoService.remove(Number(id));
    }
};
__decorate([
    (0, common_1.Post)(":userId"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto, Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "findAllTodosByUserIdNotCompleted", null);
__decorate([
    (0, common_1.Get)("/findAllCompleted/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "findAllTodosByUserIdCompleted", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "remove", null);
TodoController = __decorate([
    (0, common_1.Controller)("todo"),
    (0, swagger_1.ApiTags)("Todo"),
    (0, swagger_1.ApiSecurity)("JWT-auth"),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map