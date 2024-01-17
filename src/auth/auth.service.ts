import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/core/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    // console.log(user)
    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: any) {
    try {
      const newUser = await this.usersService.create(user);

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }
}
