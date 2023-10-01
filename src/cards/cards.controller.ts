import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User, UserPayload } from '../decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get('all/:id')
  findAll(@User() user: UserPayload, @Param('userId') userId: number) {
    return this.cardsService.findAll(user, userId);
  }

  @Get(':id')
  findOne(@User() user: UserPayload, @Param('id') id: string) {
    return this.cardsService.findOne(user, +id);
  }

  @Delete(':id')
  remove(@User() user: UserPayload, @Param('id') id: string) {
    return this.cardsService.remove(user, +id);
  }
}
