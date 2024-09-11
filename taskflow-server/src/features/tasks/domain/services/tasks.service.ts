import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateTask } from '../../domain/contracts/inputs/createTask';
import { TasksRepository } from '../../domain/contracts/repository/tasks.repository.contract';
import { UsersRoles } from '../../../../features/users/domain/enuns/userRoles';

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
}
