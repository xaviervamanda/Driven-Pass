import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import Cryptr from 'cryptr';
import { UserPayload } from 'src/decorators/user.decorator';

@Injectable()
export class CredentialsService {

  constructor(private readonly credentialsRepository: CredentialsRepository,
    private readonly cryptr: Cryptr) {
      this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    }
  async create(createCredentialDto: CreateCredentialDto) {
    const credential = this.credentialsRepository.findOneByTitle(createCredentialDto.title, createCredentialDto.userId);
    if (credential) {
      throw new ConflictException("This title already exists");
    }
    createCredentialDto.password = this.cryptr.encrypt(createCredentialDto.password);
    return await this.credentialsRepository.create(createCredentialDto);
  }

  async findAll(user: UserPayload, userId: number) {
    if (!userId){
      userId = user.id;
    }
    if (user.id !== userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    const credentials = await this.credentialsRepository.findAll(userId);
    credentials.map (c => c.password = this.cryptr.decrypt(c.password));
    return credentials;
  }

  async findOne(user: UserPayload, id: number) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException("Credential not found");
    }
    if (user.id !== credential.userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return credential;
  }

  async remove(user: UserPayload, id: number) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException("Credential not found");
    }
    if (user.id !== credential.userId) {
      throw new ForbiddenException("You are not authorized to access this resource");
    }
    return await this.credentialsRepository.remove(id);
  }
}
