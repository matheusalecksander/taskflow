import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import 'dotenv/config';
import { envs } from '../environment/vars';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../../features/users/application/services/users.service';
import { UsersRepository } from '../../features/users/domain/contracts/repository/users.repository.contract';
import { PrismaUsersRepository } from '../../infrastructure/database/orms/prisma/repositories/users.prisma.repository';
import { CryptoService } from '../../_utils/crypto.service';
import { PrismaService } from '../../infrastructure/database/orms/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: envs.get('JWT_SECRET'),
        publicKey: envs.get('JWT_SECRET'),
        privateKey: envs.get('JWT_PRIVATE_SECRET'),
        signOptions: {
          expiresIn: '600s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    CryptoService,
    JwtStrategy,
  ],
})
export class AuthModule {}
