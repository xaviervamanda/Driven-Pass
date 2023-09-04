import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UsersModule } from '../users/users.module';
import { NotesRepository } from './notes.repository';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
  exports: [NotesService],
  imports: [UsersModule]
})
export class NotesModule {}
