import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './notes.repository';
import { UserPayload } from '../decorators/user.decorator';

@Injectable()
export class NotesService {

  constructor(private readonly notesRepository: NotesRepository) {}
  async create(createNoteDto: CreateNoteDto) {
    const note = await this.notesRepository.findOneByTitle(createNoteDto.title);
    if (note) {
      throw new ConflictException("This title already exists");
    }
    return await this.notesRepository.create(createNoteDto);
  }

  async findAll(user: UserPayload, userId: number) {
    if (!userId){
      userId = user.id;
    }
    if (user.id !== userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return await this.notesRepository.findAll(userId);
  }

  async findOne(user: UserPayload, id: number) {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException("Note not found");
    }
    if (user.id !== note.userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return note;
  }

  async remove(user: UserPayload, id: number) {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException("Note not found");
    }
    if (user.id !== note.userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return await this.notesRepository.remove(id);
  }
}
