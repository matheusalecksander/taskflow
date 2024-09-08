import { User } from '../../entities/user';
import { CreateUser } from '../inputs/createUsers';

export abstract class UsersRepository {
  abstract create(data: CreateUser): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
