import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { UsersModule } from '../users/users.module';
import { CredentialsRepository } from './credentials.repository';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository],
  exports: [CredentialsService],
  imports: [UsersModule]
})
export class CredentialsModule {}
