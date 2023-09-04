import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EraseController],
  providers: [EraseService],
  exports: [EraseService],
  imports: [UsersModule]
})
export class EraseModule {}
