import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[];

  constructor() {
    this.tasks = [{ id: 1, description: 'estudar nest', done: false }];
  }

  private getIndexById(id: number) {
    return this.tasks.findIndex((task) => task.id === id);
  }

  private getNewId(): number {
    const lastTask = this.tasks[this.tasks.length - 1];
    return lastTask.id + 1;
  }

  create(task: Task) {
    const dataToSave = {
      ...task,
      id: this.getNewId(),
    };
    this.tasks.push(dataToSave);
    return this.tasks[this.tasks.length - 1];
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: number, task: Task) {
    const taskIndex = this.getIndexById(id);
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...task,
    };
    return this.tasks[taskIndex];
  }

  remove(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
