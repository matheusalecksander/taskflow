import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import 'dotenv/config';
import { envs } from '../environment/vars';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.get('JWT_SECRET'),
      publicKey: envs.get('JWT_SECRET'),
      privateKey: envs.get('JWT_PRIVATE_SECRET'),
      signOptions: {
        expiresIn: '600s',
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
