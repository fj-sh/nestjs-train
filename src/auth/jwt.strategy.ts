import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey123',
    });
  }

  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findOne({ id, username });
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
