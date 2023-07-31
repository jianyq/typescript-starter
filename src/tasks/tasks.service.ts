import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async findOne(taskId: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
  }

  async deleteOne(taskId: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
