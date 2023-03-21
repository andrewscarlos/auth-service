import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserPayload } from './interfaces/UserPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './interfaces/UserToken.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwt = this.jwtService.sign(payload);
    return {
      access_token: jwt,
    };
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        user.password = undefined;
        return user;
      }
    }
    throw new Error('Email address or password is incorrect');
  }
}
