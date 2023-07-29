import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Repository } from 'src/repository';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, Repository],
})
export class ArtistModule {}
