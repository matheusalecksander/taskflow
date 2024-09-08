import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from '../../domain/contracts/inputs/createUsers';
import { UsersService } from '../services/users.service';

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
}
