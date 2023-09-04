import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor (private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('This email cannot be used');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneById(id);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.remove(id);
  }
}
