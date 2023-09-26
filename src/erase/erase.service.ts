import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseDto } from './dto/erase.dto';
import { UserPayload } from '../decorators/user.decorator';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { deleteUserData } from '../utils/deleteUserData';

@Injectable()
export class EraseService {
  private readonly deleteUtil: deleteUserData;
  constructor(private readonly usersService: UsersService) {
  }
  async deleteAll(user: UserPayload, eraseDto: EraseDto) {
    const userData = await this.usersService.findOneById(user.id);
    const isValidPassword = await bcrypt.compare(eraseDto.password, userData.password);
    if (!isValidPassword){
      throw new UnauthorizedException();
    }
    return this.deleteUtil.deleteAll(user.id);
  }
}
