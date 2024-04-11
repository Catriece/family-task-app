import {
  Controller,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Post, Body, Headers, Request } from '@nestjs/common';
import { UserLoginDto } from './dto/login-user-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { AuthGuard } from './auth.guard';
import {
  ChangePasswordDto,
  UpdatePasswordDto,
} from './dto/update-password-dto';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { DeleteUserDto } from '../user/dto/delete-user.dto';
import * as jwt from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/get-user')
  async getUserData(@Headers('Authorization') authorizationHeader: string) {
    const user = await this.userService.findUserWithToken(authorizationHeader);

    const payload = {
      ...user,
      isActive: user.isActive === true,
      password: user.password === undefined,
    };
    return payload;
  }

  @Post('/login')
  async login(@Body() loginDto: UserLoginDto) {
    const email: string = loginDto.email;
    const password: string = loginDto.password;
    return await this.authService.login(email, password);
  }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);
    return data;
  }

  @Post('/checkemail')
  async checkEmail(@Body() email) {
    const data = await this.authService.checkEmail(email.email);
    return data;
  }

  @Post('/reset-password-email')
  async resetPassword(@Body('email') email: string) {
    const payload = await this.authService.resetPassword(email);
    if (payload) return true;
  }

  //Change password route when user is logged out
  @Post('/reset-password')
  async updatePassword(@Body() body: UpdatePasswordDto) {
    let status: string = 'from-login';

    const payload = await this.authService.updatePassword(body, status);
    if (payload !== null) return true;
  }

  // Change password route when user is logged in
  @UseGuards(AuthGuard)
  @Post('/update-password')
  async changePassword(@Body() body: ChangePasswordDto) {
    const payload = await this.authService.changePassword(body);
    if (payload !== null) {
      return true;
    } else {
      return false;
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-user')
  async deleteUser(@Body() body: DeleteUserDto) {
    await this.authService.deleteUser(body);
  }

  // Change name route
  @UseGuards(AuthGuard)
  @Post('/update-user-personal-info')
  async updatePersonalInformation(@Body() body: UpdateUserDto) {
    const payload = await this.authService.updatePersonalInformation(body);

    if (payload) return payload;
  }

  @UseGuards(AuthGuard)
  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('profilePhoto'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log('File url: ', file);
  }
}
