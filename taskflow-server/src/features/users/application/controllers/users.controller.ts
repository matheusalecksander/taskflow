import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUser } from '../../domain/contracts/inputs/createUsers';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/_core/auth/jwt-auth.guard';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private service: UsersService) {}
  @Post()
  async create(@Body() body: CreateUser) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return this.service.list();
  }
}
