import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(@InjectRepository(Track) private repository: Repository<Track>) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = Track.createFromDTO(createTrackDto);
    const result = await this.repository.save(track);
    return result;
  }

  async findAll(): Promise<Track[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.repository.findOneBy({ id });
    if (!track) throw new HttpException('Track not found', 404);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.repository.findOneBy({ id });
    if (!track) throw new HttpException('Track not found', 404);
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    await this.repository.update({ id }, track);
    return track;
  }

  async remove(id: string) {
    const track = await this.repository.findOneBy({ id });
    if (!track) throw new HttpException('Track not found', 404);
    return this.repository.delete(id);
  }
}
