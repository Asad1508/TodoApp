"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const typeorm_1 = require("typeorm");
const todo_entity_1 = require("../entities/todo.entity");
let TodoRepository = class TodoRepository extends typeorm_1.Repository {
};
TodoRepository = __decorate([
    (0, typeorm_1.EntityRepository)(todo_entity_1.Todo)
], TodoRepository);
exports.TodoRepository = TodoRepository;
//# sourceMappingURL=todo.repository.js.map