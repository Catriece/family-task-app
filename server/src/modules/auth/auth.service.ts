import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SendEmailDto } from '../mail/dto/mail.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordTemplate } from '../mail/emailTemplates/password-reset';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { DeleteUserDto } from '../user/dto/delete-user.dto';
import { TasksService } from '../tasks/tasks.service';
import { profile } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private taskService: TasksService,
  ) {} // Add constructor to allow usage of service

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email); // findUserByEmail is a service function created in the UserModule and its being utilized by AuthModule

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) throw new UnauthorizedException();

      const payload = {
        sub: user.id,
        email: user.email,
        isActive: user.isActive,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
        payload,
      };
    } else {
      console.error('user does not exist');
    }
    return user;
  }

  // Salt and hashing password function
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10); // 10 salt rounds
  }
  // Compare Password
  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async signUp(signUpDto): Promise<any> {
    const hashedPassword = await this.hashPassword(signUpDto.password);
    const user = {
      ...signUpDto,
      password: hashedPassword,
    };

    const createdUser = await this.userService.createUser(user);

    if (createdUser !== null) {
      const payload = {
        sub: createdUser.id,
        email: createdUser.email,
        isActive: createdUser.isActive,
      };

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

  async updatePassword(updatePasswordDto: UpdatePasswordDto, status: string) {
    const { id, token, password } = updatePasswordDto;

    const user = await this.userService.findUserById(id);

    const payload = await this.jwtService.verifyAsync(token, {
      secret: `${user.password}-${user.createdAt}`,
    });

    if (payload) {
      const hashedPassword = await this.hashPassword(password);
      user.password = hashedPassword;
      return await this.userService.createUser(user);
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { id, token, newPassword, currentPassword } = changePasswordDto;

    const user = await this.userService.findUserById(id);

    // Compare incoming current password to db password
    const verified = await this.comparePassword(currentPassword, user.password);

    if (verified === false)
      throw new UnauthorizedException('Current password is incorrect');
    else {
      const hashedPassword = await this.hashPassword(newPassword);
      user.password = hashedPassword;
      return await this.userService.createUser(user);
    }
  }

  async updatePersonalInformation(body) {
    const {
      id,
      Email,
      birthday,
      preferredName,
      lastName,
      firstName,
      profilePhoto,
    } = body;

    const user = await this.userService.findUserById(id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (preferredName) user.preferredName = preferredName;
    if (!preferredName) user.preferredName = null;
    if (profilePhoto) user.profilePhoto = profilePhoto;
    if (birthday) user.birthday = birthday;
    if (Email) {
      const exists = await this.userService.findUserByEmail(Email);

      if (exists) throw new Error('Email already exists');
      else user.email = Email; // Eventually new email should be delayed and verified with mailservice
    }

    if (user === null) throw new UnauthorizedException('User does not exist');
    else {
      return await this.userService.updateUser(user);
    }
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    const { id, password } = deleteUserDto;

    const user = await this.userService.findUserById(id);

    // Compare incoming current password to db password
    const verified = await this.comparePassword(password, user.password);

    if (verified === false)
      throw new UnauthorizedException('Incorrect password');

    try {
      const tasksToDelete = await this.taskService.getUserTasks(id);

      tasksToDelete.forEach(async (task) => {
        await this.taskService.deleteTask(task.taskId);
      });

      if (tasksToDelete.length < 1) await this.userService.deleteUser(id);
    } catch (error) {
      throw new UnauthorizedException('Unable to delete user');
    }
  }
}
