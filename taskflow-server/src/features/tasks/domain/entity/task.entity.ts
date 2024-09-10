import { User } from 'src/features/users/domain/entities/user';
import { TaskStatus } from '../enuns/taskStatus';

export class Tasks {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  owner: User;
  responsible?: User;
}
