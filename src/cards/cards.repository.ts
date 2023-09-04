import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';


@Injectable()
export class CardsRepository {

  constructor(private readonly prisma: PrismaService) {}
  async create(createCardDto: CreateCardDto) {
    return await this.prisma.card.create({
      data: createCardDto
    });
  }

  async findAll(userId: number) {
    return await this.prisma.card.findMany({
      where: { userId }
    });
  }

  async findOne(id: number) {
    return await this.prisma.card.findUnique({
      where: { id }
    });
  }

  async findOneByTitle(title: string) {
    return await this.prisma.card.findFirst({
      where: { title }
    });
  }

  async remove(id: number) {
    return await this.prisma.card.delete({
      where: { id }
    });
  }
}
