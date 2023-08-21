import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ArtistService {
  constructor(@InjectRepository(Artist) private repository: Repository<Artist>) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = Artist.createFromDTO(createArtistDto);
    const result = await this.repository.save(artist);
    return result;
  }

  async findAll(): Promise<Artist[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.repository.findOneBy({ id });
    if (!artist) throw new HttpException('Artist not found', 404);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.repository.findOneBy({ id });
    if (!artist) throw new HttpException('Artist not found', 404);
    artist.grammy = updateArtistDto.grammy;
    await this.repository.update({ id: artist.id}, artist)
    return artist;
  }

  async remove(id: string) {
    const artist = await this.repository.findOneBy({ id });
    if (!artist) throw new HttpException('Artist not found', 404);

    return this.repository.delete(id);
  }
}

