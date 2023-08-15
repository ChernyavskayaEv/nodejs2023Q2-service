import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumService {
  constructor(@InjectRepository(Album) private repository: Repository<Album>) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = Album.createFromDTO(createAlbumDto);
    const result = await this.repository.save(album);
    return result;
  }

  findAll(): Promise<Album[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.repository.findOneBy({ id });
    if (!album) throw new HttpException('Album not found', 404);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.repository.findOneBy({ id });
    if (!album) throw new HttpException('Album not found', 404);
    album.artistId = updateAlbumDto.artistId;
    album.year = updateAlbumDto.year;
    await this.repository.update({ id }, album);
    return album;
  }

  async remove(id: string) {
    const album = await this.repository.findOneBy({ id });
    if (!album) throw new HttpException('Album not found', 404);
    return this.repository.delete(id);
  }
}
