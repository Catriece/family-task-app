import { Controller, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Post, Body, Request } from '@nestjs/common';
import { UserLoginDto } from './dto/login-user-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { AuthGuard } from './auth.guard';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUserData(@Request() params) {
    const { id } = params.query;
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Post('/login')
  async login(@Body() loginDto: UserLoginDto) {
    const email: string = loginDto.email;
    const password: string = loginDto.password;
    const data = await this.authService.login(email, password);
    return data;
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

  @Post('/reset-password')
  async resetPassword(@Body('email') email: string) {
    const payload = await this.authService.resetPassword(email);
    if (payload) return true;
  }

  @Post('/update-password')
  async updatePassword(@Body() body: UpdatePasswordDto) {
    const payload = await this.authService.updatePassword(body);
    if (payload !== null) return true;
  }
}
