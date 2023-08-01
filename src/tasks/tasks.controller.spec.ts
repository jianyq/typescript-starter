import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task as TaskModel, Prisma } from '@prisma/client';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Test task',
              description: 'Test description',
            }),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Test task',
              description: 'Test description',
            }),
            deleteOne: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should create a task', async () => {
    const task: Prisma.TaskCreateInput = {
      title: 'Test task',
      description: 'Test description',
    };

    expect(await tasksController.createTask(task)).toEqual({
      id: 1,
      title: 'Test task',
      description: 'Test description',
    });

    expect(tasksService.create).toHaveBeenCalledWith(task);
  });

  it('should get a task', async () => {
    const id = '1';
    expect(await tasksController.getTask(id)).toEqual({
      id: 1,
      title: 'Test task',
      description: 'Test description',
    });

    expect(tasksService.findOne).toHaveBeenCalledWith(+id);
  });

  it('should delete a task', async () => {
    const id = '1';
    expect(await tasksController.deleteTask(id)).toEqual({});

    expect(tasksService.deleteOne).toHaveBeenCalledWith(+id);
  });
});
