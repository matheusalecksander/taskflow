import { Tasks } from '../../entity/task.entity';
import { CreateTask } from '../inputs/createTask';
import { UpdateTask } from '../inputs/updateTask';

export abstract class TasksRepository {
  abstract create(data: CreateTask): Promise<Tasks>;
  abstract findByNameAndIdOwner(ownerId: string, name: string): Promise<Tasks>;
  abstract findById(taskId: string): Promise<Tasks>;
  abstract update(
    data: Pick<
      UpdateTask,
      'taskId' | 'name' | 'description' | 'status' | 'responsibleId'
    >,
  ): Promise<boolean>;
  abstract findAll(): Promise<Tasks[]>;
}
