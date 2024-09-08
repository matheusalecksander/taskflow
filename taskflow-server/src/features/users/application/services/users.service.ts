import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from '../../domain/contracts/inputs/createUsers';
import { UsersRepository } from '../../domain/contracts/repository/users.repository.contract';
import { CryptoService } from 'src/_utils/crypto.service';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    private cryptoService: CryptoService,
  ) {}
  async create(data: CreateUser) {
    const userAlreadyCreated = await this.repository.findByEmail(data.email);

    if (userAlreadyCreated) {
      throw new BadRequestException('Usuário já cadastrado no sistema');
    }
    const hashedPassword = await this.cryptoService.hash(data.password);

    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return user;
  }

  async list() {
    const users = await this.repository.list();

    if (!users.length) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }

    return users;
  }
}
