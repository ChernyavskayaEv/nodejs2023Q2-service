import { randomUUID } from 'crypto';
import { CreateTrackDto } from '../dto/create-track.dto';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  static createFromDTO(dto: CreateTrackDto): Track {
    const track = new Track();
    track.id = randomUUID();
    track.name = dto.name;
    track.artistId = dto.artistId ?? null;
    track.albumId = dto.albumId ?? null;
    track.duration = dto.duration;

    return track;
  }
}
