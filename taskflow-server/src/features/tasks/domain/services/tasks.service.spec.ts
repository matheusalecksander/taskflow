import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from '../../domain/contracts/repository/tasks.repository.contract';
import { CreateTask } from '../../domain/contracts/inputs/createTask';
import { UsersRoles } from '../../../../features/users/domain/enuns/userRoles';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { TaskStatus } from '../../domain/enuns/taskStatus';
import { UpdateTask } from '../contracts/inputs/updateTask';

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
            findById: jest.fn(),
            update: jest.fn(),
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

  describe('Update', () => {
    it('should throw if task not found', async () => {
      const task = makeFakeTask();
      jest.spyOn(tasksRepository, 'findById').mockResolvedValueOnce(null);
      const promise = sut.update({
        taskId: 'any_id',
        user: task.user,
        name: 'any_name',
        description: 'any_description',
      });
      await expect(promise).rejects.toThrow(
        new BadRequestException('Tarefa não localizada'),
      );
    });

    it('should throw if user is not the owner or responsible', async () => {
      const task = makeFakeTask();
      jest.spyOn(tasksRepository, 'findById').mockResolvedValueOnce({
        ...task,
        owner: { id: 'another_user_id' },
        responsible: { id: 'another_user_id' },
      } as any);
      const promise = sut.update({
        taskId: 'any_id',
        user: task.user,
        name: 'any_name',
        description: 'any_description',
      });
      await expect(promise).rejects.toThrow(
        new ForbiddenException(
          'Você não tem permissão para editar esta tarefa',
        ),
      );
    });

    it('should call repository with correct values', async () => {
      const task = makeFakeTask();
      jest.spyOn(tasksRepository, 'findById').mockResolvedValueOnce({
        ...task,
        owner: task.user,
      } as any);
      const updatedTask: UpdateTask = {
        taskId: 'any_id',
        user: task.user,
        name: 'updated_name',
        description: 'updated_description',
        responsibleId: 'updated_responsible_id',
        status: TaskStatus.IN_PROGRESS,
      };
      jest.spyOn(tasksRepository, 'update').mockResolvedValueOnce({} as any);
      await sut.update(updatedTask);
      expect(tasksRepository.update).toHaveBeenCalledWith({
        taskId: updatedTask.taskId,
        name: updatedTask.name,
        description: updatedTask.description,
        responsibleId: updatedTask.responsibleId,
        status: updatedTask.status,
      });
    });

    it('should throw if repository returns false', async () => {
      const task = makeFakeTask();
      jest.spyOn(tasksRepository, 'findById').mockResolvedValueOnce({
        ...task,
        owner: task.user,
      } as any);
      jest.spyOn(tasksRepository, 'update').mockResolvedValueOnce(false);
      const promise = sut.update({
        taskId: 'any_id',
        user: task.user,
        name: 'any_name',
        description: 'any_description',
      });
      await expect(promise).rejects.toThrow(
        new BadRequestException('Ocorreu um erro ao atualizar a tarefa'),
      );
    });

    it('should return true on success', async () => {
      const task = makeFakeTask();
      jest.spyOn(tasksRepository, 'findById').mockResolvedValueOnce({
        ...task,
        owner: task.user,
      } as any);
      const updatedTask: UpdateTask = {
        taskId: 'any_id',
        user: task.user,
        name: 'updated_name',
        description: 'updated_description',
        responsibleId: 'updated_responsible_id',
        status: TaskStatus.IN_PROGRESS,
      };
      jest.spyOn(tasksRepository, 'update').mockResolvedValueOnce(true);
      const response = await sut.update(updatedTask);
      expect(response).toBe(true);
    });
  });
});
