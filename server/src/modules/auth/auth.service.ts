import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/login-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SendEmailDto } from '../mail/dto/mail.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordTemplate } from '../mail/emailTemplates/password-reset';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { SignUpDto } from './dto/sign-up-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {} // Add constructor to allow usage of service

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email); // findUserByEmail is a service function created in the UserModule and its being utilized by AuthModule

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) throw new UnauthorizedException();

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

    const dto: SendEmailDto = {
      recipients: [{ name: payload.name, address: payload.email }],
      subject: 'Password Reset',
      html: ResetPasswordTemplate(token, payload.sub),
    };

    return await this.mailService.sendPasswordResetEmail(dto);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { id, token, password } = updatePasswordDto;

    const user = await this.userService.findUserById(id);
    console.log('USER BEING UPDATED: ', user);

    const payload = await this.jwtService.verifyAsync(token, {
      secret: `${user.password}-${user.createdAt}`,
    });
    console.log('PAYLOAD IN UP: ', payload);

    if (payload) {
      const hashedPassword = await this.hashPassword(password);
      user.password = hashedPassword;
      console.log('USER BEING CREATED: ', user);
      return await this.userService.createUser(user);
    }
  }
}
