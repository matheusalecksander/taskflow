import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/features/users/application/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(user: { email: string; password: string }) {
    const findUser = await this.usersService.findByEmail(user.email);
    const payload = {
      sub: findUser.id,
      name: findUser.name,
      role: findUser.role,
      email: findUser.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
