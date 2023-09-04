import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService],
  exports: [CredentialsService],
  imports: [UsersModule]
})
export class CredentialsModule {}
