import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from './interfaces/user.interface';
import { envs } from '../environment/vars';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKey: envs.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<IUser> {
    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  }
}
