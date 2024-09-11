import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../../domain/services/tasks.service';
import { JwtAuthGuard } from '../../../../_core/auth/jwt-auth.guard';
import { CreateTask } from '../../domain/contracts/inputs/createTask';
import { Request } from 'express';
import { IUser } from '../../../../_core/auth/interfaces/user.interface';
import { UpdateTask } from '../../domain/contracts/inputs/updateTask';

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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() body: UpdateTask,
    @Req() req: Request,
    @Param('id') taskId: string,
  ) {
    if (!Object.keys(body).length) {
      throw new BadRequestException('O body não pode estar vazio');
    }

    return this.service.update({
      ...body,
      taskId,
      user: req.user as IUser,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.service.findAll();
  }
}
