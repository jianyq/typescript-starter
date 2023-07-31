import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TasksService } from '../src/tasks/tasks.service';
import { TaskStatus } from '../src/tasks/task-status.enum';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  const testTask = {
    title: 'Test task',
    description: 'Test task description',
    status: TaskStatus.TODO,
  };

  let taskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send(testTask)
      .expect(201)
      .then(({ body }) => {
        taskId = body.id;
        expect(body.title).toEqual(testTask.title);
        expect(body.description).toEqual(testTask.description);
        expect(body.status).toEqual(testTask.status);
      });
  });

  it('/tasks/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.id).toEqual(taskId);
        expect(body.title).toEqual(testTask.title);
        expect(body.description).toEqual(testTask.description);
        expect(body.status).toEqual(testTask.status);
      });
  });

  it('/tasks/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
