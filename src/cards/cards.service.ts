import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsRepository } from './cards.repository';
import Cryptr from 'cryptr';
import { UserPayload } from '../decorators/user.decorator';

@Injectable()
export class CardsService {
  private readonly cryptr: Cryptr;
  constructor(private readonly cardsRepository: CardsRepository) {
    const Cryptr = require('cryptr');
    this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  }
  async create(createCardDto: CreateCardDto) {
    const card = await this.cardsRepository.findOneByTitle(createCardDto.title);
    if (card) {
      throw new ConflictException("This title already exists");
    }
    createCardDto.password = this.cryptr.encrypt(createCardDto.password);
    createCardDto.CVC = this.cryptr.encrypt(createCardDto.CVC);
    return await this.cardsRepository.create(createCardDto);
  }

  async findAll(user: UserPayload, userId: number) {
    if (!userId){
      userId = user.id;
    }
    if (user.id !== userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return await this.cardsRepository.findAll(userId);
  }

  async findOne(user: UserPayload, id: number) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException("Note not found");
    }
    if (user.id !== card.userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return card;
  }

  async remove(user: UserPayload, id: number) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException("Note not found");
    }
    if (user.id !== card.userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return await this.cardsRepository.remove(id);
  }
}
