import { Injectable } from '@nestjs/common';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesRepository {

  constructor(private readonly prisma: PrismaService) {}
  async create(createNoteDto: CreateNoteDto) {
    return await this.prisma.note.create({
      data: createNoteDto
    });
  }

  async findAll(userId: number) {
    return await this.prisma.note.findMany(
      {
        where: { userId }
      }
    );
  }

  async findOne(id: number) {
    return await this.prisma.note.findUnique({
      where: { id }
    });
  }

  async findOneByTitle(title: string) {
    return await this.prisma.note.findFirst({
      where: { title }
    });
  }

  async remove(id: number) {
    return await this.prisma.note.delete({
      where: { id }
    });
  }
}
