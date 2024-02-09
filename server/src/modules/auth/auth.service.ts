import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/login-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {} // Add constructor to allow usage of service

  async login(email, password): Promise<any> {
    const user = await this.userService.findUserByEmail(email); // findUserByEmail is a service function created in the UserModule and its being utilized by AuthModule

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) throw new UnauthorizedException();
      console.log('user', user);
      const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
        payload,
      };
    } else {
      console.log('user does not exist');
    }
    // bcrypt compare
    return user;
  }

  // Salt and hashing password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // 10 salt rounds
  }

  async signUp(signUpDto): Promise<any> {
    const hashedPassword = await this.hashPassword(signUpDto.password);
    const user = {
      ...signUpDto,
      password: hashedPassword,
    };

    const payload = await this.userService.createUser(user);

    if (payload !== null) {
      return {
        access_token: await this.jwtService.signAsync(payload),
        payload,
      };
    } else throw new Error('Unable to create new user.');
  }

  async checkEmail(email): Promise<any> {
    const user = await this.userService.findUserByEmail(email); // findUserByEmail is a service function created in the UserModule and its being utilized by AuthModule
    console.log('User is: ', user);
    if (user !== null) {
      return true;
    } else {
      return false;
    }
  }

  async resetPassword(email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user == null) throw new UnauthorizedException('Email does not exist');

    const payload = { sub: user.id, email: user.email, name: user.firstName };
    const token = await this.jwtService.signAsync(payload, {
      secret: `${user.password}-${user.createdAt}`, // add created_at in user entity
      expiresIn: '600s',
    });

    // send email to user with link to reset password form + token + id
  }
}
