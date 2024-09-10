import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../services/tasks.service';
import { CreateTask } from '../../domain/contracts/inputs/createTask';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as supertest from 'supertest';
import { TaskStatus } from '../../domain/enuns/taskStatus';
import { IUser } from 'src/_core/auth/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { envs } from '../../../../_core/environment/vars';
import { AuthModule } from '../../../../_core/auth/auth.module';

const makeFakeTask = (): CreateTask => ({
  description: 'any_description',
  name: 'any_name',
  responsibleId: 'any_responsible_id',
  user: {} as IUser,
});

describe('TasksController', () => {
  let app: INestApplication;
  let sut: TasksController;
  let tasksService: TasksService;
  let token: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
      imports: [AuthModule],
    }).compile();

    token = await new JwtService({
      secret: envs.get('JWT_SECRET'),
      publicKey: envs.get('JWT_SECRET'),
      privateKey: envs.get('JWT_PRIVATE_SECRET'),
      signOptions: {
        expiresIn: '600s',
      },
    }).signAsync({
      sub: 'any_user_id',
      name: 'any_name',
      role: 'any_role',
      email: 'any_email',
    });

    sut = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Create', () => {
    it('should return 400 if name is not provided', async () => {
      const task = makeFakeTask();
      delete task.name;
      await supertest(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });

    it('should return 400 if description is not provided', async () => {
      const task = makeFakeTask();
      delete task.description;
      await supertest(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });

    it('should call service with correct values', async () => {
      const task = makeFakeTask();
      const user = {
        id: 'any_user_id',
        name: 'any_name',
        role: 'any_role',
        email: 'any_email',
      };
      await supertest(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
      expect(tasksService.create).toHaveBeenCalledWith({
        ...task,
        user,
      });
    });

    it('should return 201 on success', async () => {
      const task = makeFakeTask();
      const createdTask = {
        ...task,
        owner: task.user,
        responsible: null,
        status: TaskStatus.CREATED,
        id: 'any_id',
      };
      jest.spyOn(tasksService, 'create').mockResolvedValueOnce(createdTask);
      await supertest(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect(createdTask);
    });
  });
});
