import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guards/auth.guard';
import { EraseDto } from './dto/erase.dto';
import { User, UserPayload } from 'src/decorators/user.decorator';

@Controller('erase')
@UseGuards(AuthGuard)
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Post()
  create(@User() user: UserPayload, @Body() eraseDto: EraseDto) {
    return this.eraseService.deleteAll(user, eraseDto);
  }

}
