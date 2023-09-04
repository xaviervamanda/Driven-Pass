import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";
import { User as UserPrisma} from "@prisma/client";

export interface UserPayload extends UserPrisma {}

export const User = createParamDecorator((data: string, context: ExecutionContext): UserPayload => {
  const response = context.switchToHttp().getResponse();
  if (!response.locals.user) {
    throw new NotFoundException("User not found.");
  }

  return response.locals.user;
})