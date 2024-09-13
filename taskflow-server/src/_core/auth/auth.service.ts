import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../features/users/application/services/users.service';
import { CryptoService } from 'src/_utils/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  async signIn(user: { email: string; password: string }) {
    const findUser = await this.usersService.findByEmail(user.email);

    const passwordMatched = await this.cryptoService.compare(
      user.password,
      findUser.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

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
