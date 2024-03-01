import {
  Controller,
  Delete,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Post, Body, Request } from '@nestjs/common';
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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUserData(@Query('id') id: string) {
    const payload = await this.userService.findUserById(id);
    console.log('Remember to return user w/out password', payload);
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

  // Change password route from forgot-password
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
    if (payload !== null) return true;
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-user')
  async deleteUser(@Body() body: DeleteUserDto) {
    console.log('Deleting User');
    const payload = await this.authService.deleteUser(body);
  }

  // Change name route
  @UseGuards(AuthGuard)
  @Post('/update-user-personal-info')
  async updatePersonalInformation(@Body() body: UpdateUserDto) {
    const { id, firstName, lastName, preferredName, email, birthday } = body;
    const payload = await this.authService.updatePersonalInformation(
      id,
      firstName,
      lastName,
      preferredName,
      email,
      birthday,
    );

    if (payload) return payload;
  }
}
