import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from '../../domain/services/tasks.service';
import { JwtAuthGuard } from '../../../../_core/auth/jwt-auth.guard';
import { CreateTask } from '../../domain/contracts/inputs/createTask';
import { Request } from 'express';
import { IUser } from '../../../../_core/auth/interfaces/user.interface';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private service: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateTask, @Req() req: Request) {
    return this.service.create({
      ...body,
      user: req.user as IUser,
    });
  }
}
