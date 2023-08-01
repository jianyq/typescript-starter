import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /tasks', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'Test task',
        description: 'Test description',
      })
      .expect(201)
      .expect({
        id: 1,
        title: 'Test task',
        description: 'Test description',
      });
  });

  it('GET /tasks/:id', () => {
    return request(app.getHttpServer())
      .get('/tasks/1')
      .expect(200)
      .expect({
        id: 1,
        title: 'Test task',
        description: 'Test description',
      });
  });

  it('DELETE /tasks/:id', () => {
    return request(app.getHttpServer())
      .delete('/tasks/1')
      .expect(200)
      .expect({
        id: 1,
        title: 'Test task',
        description: 'Test description',
      });
  });
});
