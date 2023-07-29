import { Repository } from 'src/repository';
import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService, Repository],
})
export class TrackModule {}
