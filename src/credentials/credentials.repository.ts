import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository {

  constructor(private readonly prisma: PrismaService) {}
  async create(createCredentialDto: CreateCredentialDto) {
    return await this.prisma.credential.create({
      data: createCredentialDto
    })
  }

  async findAll(userId: number) {
    return await this.prisma.credential.findMany({
      where: { userId }
    });
  }

  async findOne(id: number) {
    return await this.prisma.credential.findUnique({
      where: { id }
    });
  }

  async findOneByTitle(title: string, userId: number) {
    return await this.prisma.credential.findFirst({
      where: { title, userId }
    });
    
  }

  async update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return await this.prisma.credential.update({
      where: { id },
      data: updateCredentialDto
    });
  }

  async remove(id: number) {
    return await this.prisma.credential.delete({
      where: { id }
    });
  }
}
