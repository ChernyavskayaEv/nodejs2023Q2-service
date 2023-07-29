import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Repository } from 'src/repository';

@Module({
  controllers: [FavsController],
  providers: [FavsService, Repository],
})
export class FavsModule {}
