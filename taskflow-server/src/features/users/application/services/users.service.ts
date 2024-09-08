import { BadRequestException, Injectable } from '@nestjs/common';
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
}
