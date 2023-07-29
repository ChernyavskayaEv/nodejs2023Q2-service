import { randomUUID } from 'crypto';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  static createFromDTO(dto: CreateArtistDto): Artist {
    const artist = new Artist();
    artist.id = randomUUID();
    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return artist;
  }
}
