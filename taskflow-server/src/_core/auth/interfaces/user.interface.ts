import { UsersRoles } from 'src/features/users/domain/enuns/userRoles';

export interface IUser {
  id: string;
  name: string;
  role: UsersRoles;
}
