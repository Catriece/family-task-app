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
      const payload = { sub: user.id, email: user.email };
      return { access_token: await this.jwtService.signAsync(payload) };
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

    const newUser = await this.userService.createUser(user);

    if (newUser !== null) return newUser;
    else return false;
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
}
