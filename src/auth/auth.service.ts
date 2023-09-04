import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import SignUpDto from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import SignInDto from './dto/sign-in.dto';

@Injectable()
export class AuthService {

    private EXPIRATION_TIME = "7 days";
    private ISSUER = "Driven";
    private AUDIENCE = "users";

    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {}

    async signUp(signUpDto: SignUpDto) {
        return await this.usersService.create(signUpDto);
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.findOneByEmail(signInDto.email);
        if (!user) {
            throw new UnauthorizedException("Email or password is incorrect");
        }
        const validPassword = await bcrypt.compare(signInDto.password, user.password);
        if (!validPassword) {
            throw new UnauthorizedException("Email or password is incorrect");
        }
        return this.createToken(user);
    }

    private async createToken(user: User) {
        const { id, email } = user;
    
        const token = this.jwtService.sign({ email }, {
          expiresIn: this.EXPIRATION_TIME,
          subject: String(id),
          issuer: this.ISSUER,
          audience: this.AUDIENCE
        });
    
        return { token }
    }

    checkToken(token: string) {
        try {
          const data = this.jwtService.verify(token, {
            audience: this.AUDIENCE,
            issuer: this.ISSUER
          });
    
          return data;
        } catch (error) {
          console.log(error);
          throw new BadRequestException(error);
        }
    }
}
