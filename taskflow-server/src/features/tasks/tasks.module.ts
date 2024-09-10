import { Module } from '@nestjs/common';
import { TasksController } from './application/controllers/tasks.controller';
import { TasksService } from './application/services/tasks.service';
import { TasksRepository } from './domain/contracts/repository/tasks.repository.contract';
import { PrismaTasksRepository } from 'src/infrastructure/database/orms/prisma/repositories/tasks.prisma.repository';
import { AuthModule } from 'src/_core/auth/auth.module';
import { PrismaService } from 'src/infrastructure/database/orms/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository,
    },
    PrismaService,
  ],
})
export class TasksModule {}
