import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guards/auth.guard';
import { EraseDto } from './dto/erase.dto';
import { User, UserPayload } from '../decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('erase')
@Controller('erase')
@UseGuards(AuthGuard)
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Post()
  create(@User() user: UserPayload, @Body() eraseDto: EraseDto) {
    return this.eraseService.deleteAll(user, eraseDto);
  }

}
