import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Repository } from 'src/repository';

@Module({
  controllers: [UserController],
  providers: [UserService, Repository],
})
export class UserModule {}
