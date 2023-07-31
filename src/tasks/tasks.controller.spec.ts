import { Test, TestingModule } from '@nestjs/testing';
import { Task as TaskModel, Prisma } from '@prisma/client';
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<TaskModel> {
    return this.prisma.task.create({
      data,
    });
  }

  async findOne(taskId: number): Promise<TaskModel | null> {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
  }

  async deleteOne(taskId: number): Promise<TaskModel> {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}

class TasksController {
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

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
