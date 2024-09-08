import { Module } from '@nestjs/common';
import { UsersController } from './application/controllers/users.controller';
import { UsersService } from './application/services/users.service';
import { UsersRepository } from './domain/contracts/repository/users.repository.contract';
import { PrismaUsersRepository } from 'src/infrastructure/database/orms/prisma/repositories/users.prisma.repository';
import { PrismaService } from 'src/infrastructure/database/orms/prisma/prisma.service';
import { CryptoService } from 'src/_utils/crypto.service';
import { AuthModule } from 'src/_core/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    CryptoService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
