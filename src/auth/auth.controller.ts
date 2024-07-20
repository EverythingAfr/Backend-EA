import { Controller, Get, Post, Body, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn } from './dto/signin-auth.dto';
import { Public } from '../decorators/public.decorator';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('user/login')
  userSignIn(@Body() signInDTO: SignIn) {
    return this.authService.signIn(signInDTO);
  }

  // @HttpCode(HttpStatus.OK)
  // @Get('user/register')
  // userRegister(@Request() req){
  //   return req.user;
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  adminSignIn(@Body() signInDTO: SignIn) {
    return this.authService.signIn(signInDTO);
  }

  // @HttpCode(HttpStatus.OK)
  // @Get('admin/register')
  // adminRegister(@Request() req){
  //   return req.user;
  // }

}
