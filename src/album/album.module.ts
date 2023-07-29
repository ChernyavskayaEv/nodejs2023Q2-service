import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Repository } from 'src/repository';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, Repository],
})
export class AlbumModule {}
