import { randomUUID } from 'crypto';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  static createFromDTO(dto: CreateAlbumDto): Album {
    const album = new Album();
    album.id = randomUUID();
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId ?? null;

    return album;
  }
}
