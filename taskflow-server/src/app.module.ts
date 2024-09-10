import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { TasksModule } from './features/tasks/tasks.module';

@Module({
  imports: [UsersModule, TasksModule],
})
export class AppModule {}
