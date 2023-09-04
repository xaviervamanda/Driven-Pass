import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {

  constructor (private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ 
      data: createUserDto 
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOneById(id: number) {
    return await this.prisma.user.findUnique({ 
      where: { id } 
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ 
      where: { email } 
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id }
    });
  }
}
