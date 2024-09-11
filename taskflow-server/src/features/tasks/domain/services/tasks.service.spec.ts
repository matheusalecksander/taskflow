import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from '../../domain/contracts/repository/tasks.repository.contract';
import { CreateTask } from '../../domain/contracts/inputs/createTask';
import { UsersRoles } from '../../../../features/users/domain/enuns/userRoles';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { TaskStatus } from '../../domain/enuns/taskStatus';

const makeFakeTask = (): CreateTask => ({
  description: 'any_description',
  name: 'any_name',
  responsibleId: 'any_responsible_id',
  user: {
    id: 'any_user_id',
    role: UsersRoles.ADMIN,
    name: 'any_user_name',
  },
});

describe('TasksService', () => {
  let sut: TasksService;
  let tasksRepository: TasksRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: {
            create: jest.fn(),
            findByNameAndIdOwner: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Create', () => {
    it('should call repository with correct values', async () => {
      const task = makeFakeTask();
      jest.spyOn(tasksRepository, 'create').mockResolvedValueOnce({} as any);
      await sut.create(task);
      expect(tasksRepository.create).toHaveBeenCalledWith(task);
    });

    it('should throw if user is not a manager', async () => {
      const task = makeFakeTask();
      task.user.role = UsersRoles.USER;
      const promise = sut.create(task);
      await expect(promise).rejects.toThrow(
        new ForbiddenException('Você não tem permissão para criar tarefas'),
      );
    });

    it('should throw if repository find task with same name and owner', async () => {
      const task = makeFakeTask();
      jest
        .spyOn(tasksRepository, 'findByNameAndIdOwner')
        .mockResolvedValueOnce({} as any);
      const promise = sut.create(task);
      await expect(promise).rejects.toThrow(
        new BadRequestException('Você ja criou uma tarefa com esse nome'),
      );
    });

    it('should throw if repository returns null', async () => {
      const task = makeFakeTask();
      jest.spyOn(tasksRepository, 'create').mockResolvedValueOnce(null);
      const promise = sut.create(task);
      await expect(promise).rejects.toThrow(
        new BadRequestException('Ocorreu um erro ao criar a tarefa'),
      );
    });

    it('should return created task on success', async () => {
      const task = makeFakeTask();
      const createdTask = {
        ...task,
        owner: task.user,
        responsible: null,
        status: TaskStatus.CREATED,
        id: 'any_id',
      };
      jest.spyOn(tasksRepository, 'create').mockResolvedValueOnce(createdTask);
      const response = await sut.create(task);
      expect(response).toEqual(createdTask);
    });
  });
});
