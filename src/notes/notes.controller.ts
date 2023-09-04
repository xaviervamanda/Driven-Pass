import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User, UserPayload } from '../decorators/user.decorator';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get('all/:id')
  findAll(@User() user: UserPayload, @Param('userId') userId: number) {
    return this.notesService.findAll(user, userId);
  }

  @Get(':id')
  findOne(@User() user: UserPayload, @Param('id') id: string) {
    return this.notesService.findOne(user, +id);
  }

  @Delete(':id')
  remove(@User() user: UserPayload, @Param('id') id: string) {
    return this.notesService.remove(user, +id);
  }
}
