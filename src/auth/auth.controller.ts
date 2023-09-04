import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import SignUpDto from './dto/sign-up.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto){
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  async signIn(@Body() signUpDto: SignUpDto){
    return this.authService.signIn(signUpDto);
  }
}
