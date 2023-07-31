import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel, Prisma } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body() taskData: Prisma.TaskCreateInput,
  ): Promise<TaskModel> {
    return this.tasksService.create(taskData);
  }

  @Get(':id')
  async getTask(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.findOne(+id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.deleteOne(+id);
  }
}
