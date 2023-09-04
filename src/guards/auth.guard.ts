import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./../auth/auth.service";
import { UsersService } from "./../users/users.service";
import { Request, Response } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const response = context.switchToHttp().getResponse() as Response;
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
      const user = await this.userService.findOneById(parseInt(data.sub));
      response.locals.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

}