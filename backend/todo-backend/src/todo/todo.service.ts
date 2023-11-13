import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoRepository } from "./repo/todo.repository";
import { Todo } from "./entities/todo.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private userService: UserService
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    try {
      let todo: Todo = new Todo();
      todo.title = createTodoDto.title;
      todo.date = new Date().toLocaleString();
      todo.completed = false;
      todo.user = await this.userService.findUserById(userId);
      return await this.todoRepository.save(todo);
    } catch (error) {}
  }

  async findAllTodoByUserNotCompleted(userId: number) {
    try {
      return await this.todoRepository.find({
        relations: ["user"],
        where: { user: { id: userId }, completed: false },
      });
    } catch (error) {}
  }

  async findAllTodoByUserCompleted(userId: number) {
    try {
      return await this.todoRepository.find({
        relations: ["user"],
        where: { user: { id: userId }, completed: true },
      });
    } catch (error) {}
  }

  async update(todoId: number) {
    try {
      return await this.todoRepository.update(todoId, { completed: true });
    } catch (error) {}
  }

  async remove(todoId: number) {
    try {
      return await this.todoRepository.delete(todoId);
    } catch (error) {}
  }
}
