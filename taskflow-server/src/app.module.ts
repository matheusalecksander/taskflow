import { Module } from '@nestjs/common';
import { AuthModule } from './_core/auth/auth.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule {}
