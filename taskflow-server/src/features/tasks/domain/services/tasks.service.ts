import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateTask } from '../../domain/contracts/inputs/createTask';
import { TasksRepository } from '../../domain/contracts/repository/tasks.repository.contract';
import { UsersRoles } from '../../../../features/users/domain/enuns/userRoles';
import { UpdateTask } from '../contracts/inputs/updateTask';

@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) {}

  async create({ description, name, responsibleId, user }: CreateTask) {
    if (user.role === UsersRoles.USER) {
      throw new ForbiddenException('Você não tem permissão para criar tarefas');
    }

    const userAlreadyCreatedTask = await this.repository.findByNameAndIdOwner(
      user.id,
      name,
    );

    if (userAlreadyCreatedTask) {
      throw new BadRequestException('Você ja criou uma tarefa com esse nome');
    }

    const task = await this.repository.create({
      description,
      name,
      user,
      responsibleId,
    });

    if (!task) {
      throw new BadRequestException('Ocorreu um erro ao criar a tarefa');
    }

    return task;
  }

  async update({ taskId, user, ...taskData }: UpdateTask) {
    const task = await this.repository.findById(taskId);

    if (!task) {
      throw new BadRequestException('Tarefa não localizada');
    }

    if (
      task.owner.id !== user.id ||
      (task.responsible && task.responsible.id !== user.id)
    ) {
      throw new ForbiddenException(
        'Você não tem permissão para editar esta tarefa',
      );
    }

    const result = await this.repository.update({
      taskId,
      ...taskData,
    });

    if (!result) {
      throw new BadRequestException('Ocorreu um erro ao atualizar a tarefa');
    }

    return result;
  }
}
