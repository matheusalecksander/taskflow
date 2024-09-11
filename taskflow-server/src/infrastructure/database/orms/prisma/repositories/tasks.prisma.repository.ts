import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTask } from 'src/features/tasks/domain/contracts/inputs/createTask';
import { UpdateTask } from 'src/features/tasks/domain/contracts/inputs/updateTask';
import { TasksRepository } from 'src/features/tasks/domain/contracts/repository/tasks.repository.contract';
import { Tasks } from 'src/features/tasks/domain/entity/task.entity';
import { TaskStatus } from 'src/features/tasks/domain/enuns/taskStatus';
import { User } from 'src/features/users/domain/entities/user';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateTask): Promise<Tasks> {
    try {
      const result = await this.prismaService.tasks.create({
        data: {
          description: input.description,
          ownerId: input.user.id,
          name: input.name,
          responsibleId: input.responsibleId,
        },
      });

      if (!result) {
        return null;
      }

      return new Tasks({
        ...result,
        status: TaskStatus.CREATED,
        owner: {
          ...input.user,
        },
        responsible: {
          id: input.responsibleId,
        } as User,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findByNameAndIdOwner(ownerId: string, name: string): Promise<Tasks> {
    try {
      const task = await this.prismaService.tasks.findFirst({
        where: {
          ownerId,
          name,
        },
        include: {
          owner: true,
          responsible: true,
        },
      });

      if (!task) {
        return null;
      }

      return new Tasks({
        ...task,
        status: TaskStatus[task.status],
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findById(taskId: string): Promise<Tasks> {
    try {
      const task = await this.prismaService.tasks.findUnique({
        where: {
          id: taskId,
        },
        include: {
          owner: true,
          responsible: true,
        },
      });

      if (!task) {
        return null;
      }

      return new Tasks({
        ...task,
        status: TaskStatus[task.status],
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(
    data: Pick<
      UpdateTask,
      'taskId' | 'name' | 'description' | 'status' | 'responsibleId'
    >,
  ): Promise<boolean> {
    try {
      const result = await this.prismaService.tasks.update({
        where: {
          id: data.taskId,
        },
        data: {
          name: data.name,
          description: data.description,
          status: data.status,
          responsibleId: data.responsibleId,
        },
      });

      if (!result) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
