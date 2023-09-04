import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User, UserPayload } from '../decorators/user.decorator';

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialsService.create(createCredentialDto);
  }

  @Get('all/:userId')
  findAll(@User() user: UserPayload, @Param('userId') userId: number) {
    return this.credentialsService.findAll(user, userId);
  }

  @Get(':id')
  findOne(@User() user: UserPayload, @Param('id') id: string) {
    return this.credentialsService.findOne(user, +id);
  }

  @Delete(':id')
  remove(@User() user: UserPayload, @Param('id') id: string) {
    return this.credentialsService.remove(user, +id);
  }
}
