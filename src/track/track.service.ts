import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Repository } from 'src/repository';

@Injectable()
export class TrackService {
  constructor(private repository: Repository) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = Track.createFromDTO(createTrackDto);
    await this.repository.saveTrack(track);
    return track;
  }

  findAll(): Track[] {
    return this.repository.getAllTracks();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.repository.getTrack(id);
    if (!track) throw new HttpException('Track not found', 404);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.repository.getTrack(id);
    if (!track) throw new HttpException('Track not found', 404);
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    await this.repository.deleteTrack(id);
    await this.repository.saveTrack(track);
    return track;
  }

  async remove(id: string) {
    const track = await this.repository.getTrack(id);
    if (!track) throw new HttpException('Track not found', 404);
    return this.repository.deleteTrack(id);
  }
}
