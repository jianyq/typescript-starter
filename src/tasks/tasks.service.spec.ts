import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';
import { Task, Prisma } from '@prisma/client';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn().mockResolvedValue({
                id: 1,
                title: 'Test task',
                description: 'Test description',
              }),
              findUnique: jest.fn().mockResolvedValue({
                id: 1,
                title: 'Test task',
                description: 'Test description',
              }),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a task', async () => {
    const task: Prisma.TaskCreateInput = {
      title: 'Test task',
      description: 'Test description',
    };

    expect(await service.create(task)).toEqual({
      id: 1,
      title: 'Test task',
      description: 'Test description',
    });

    expect(prisma.task.create).toHaveBeenCalledWith({ data: task });
  });

  it('should get a task', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual({
      id: 1,
      title: 'Test task',
      description: 'Test description',
    });

    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should delete a task', async () => {
    const id = 1;
    expect(await service.deleteOne(id)).toEqual({});

    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
