import { Tasks } from '../../entity/task.entity';
import { CreateTask } from '../inputs/createTask';

export abstract class TasksRepository {
  abstract create(data: CreateTask): Promise<Tasks>;
  abstract findByNameAndIdOwner(ownerId: string, name: string): Promise<Tasks>;
}
