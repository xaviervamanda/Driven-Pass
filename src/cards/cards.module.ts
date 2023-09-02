import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
  imports: [UsersModule]
})
export class CardsModule {}
