import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Repository } from 'src/repository';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private repository: Repository) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = Artist.createFromDTO(createArtistDto);
    await this.repository.saveArtist(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this.repository.getAllArtists();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.repository.getArtist(id);
    if (!artist) throw new HttpException('Artist not found', 404);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.repository.getArtist(id);
    if (!artist) throw new HttpException('Artist not found', 404);
    artist.grammy = updateArtistDto.grammy;
    await this.repository.deleteArtist(id);
    await this.repository.saveArtist(artist);
    return artist;
  }

  async remove(id: string) {
    const artist = await this.repository.getArtist(id);
    if (!artist) throw new HttpException('Artist not found', 404);

    return this.repository.deleteArtist(id);
  }
}
