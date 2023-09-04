import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseDto } from './dto/erase.dto';
import { UserPayload } from 'src/decorators/user.decorator';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { deleteUserData } from 'src/utils/deleteUserData';

@Injectable()
export class EraseService {

  constructor(private readonly usersService: UsersService,
    private readonly deleteUtil: deleteUserData) {}
  async deleteAll(user: UserPayload, eraseDto: EraseDto) {
    const userData = await this.usersService.findOneById(user.id);
    const isValidPassword = await bcrypt.compare(eraseDto.password, userData.password);
    if (!isValidPassword){
      throw new UnauthorizedException();
    }
    return this.deleteUtil.deleteAll(user.id);
  }
}
