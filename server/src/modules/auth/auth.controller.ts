import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Post, Body, Request } from '@nestjs/common';
import { UserLoginDto } from './dto/login-user-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('user')
  getUserData(@Request() req) {
    console.log('USER: ', req.user);
    // Call user service
    // Get all associated data for user
    return req.user;
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
    console.log('Came to controller with: ', signUpDto);
    const data = await this.authService.signUp(signUpDto);
    return data;
  }

  @Post('/checkemail')
  async checkEmail(@Body() email) {
    const data = await this.authService.checkEmail(email.email);
    return data;
  }
}
