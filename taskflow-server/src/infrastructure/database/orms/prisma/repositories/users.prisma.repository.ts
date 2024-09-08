import { UsersRepository } from 'src/features/users/domain/contracts/repository/users.repository.contract';
import { User } from 'src/features/users/domain/entities/user';
import { PrismaService } from '../prisma.service';
import { CreateUser } from 'src/features/users/domain/contracts/inputs/createUsers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateUser): Promise<User> {
    try {
      const result = await this.prismaService.users.create({
        data: {
          email: data.email,
          password: data.password,
          name: data.name,
          role: 'USER',
        },
      });

      return result;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}
