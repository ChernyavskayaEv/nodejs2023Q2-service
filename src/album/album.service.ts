import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Repository } from 'src/repository';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private repository: Repository) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = Album.createFromDTO(createAlbumDto);
    await this.repository.saveAlbum(album);
    return album;
  }

  findAll(): Album[] {
    return this.repository.getAllAlbums();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.repository.getAlbum(id);
    if (!album) throw new HttpException('Album not found', 404);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.repository.getAlbum(id);
    if (!album) throw new HttpException('Album not found', 404);
    album.artistId = updateAlbumDto.artistId;
    album.year = updateAlbumDto.year;
    await this.repository.deleteAlbum(id);
    await this.repository.saveAlbum(album);
    return album;
  }

  async remove(id: string) {
    const album = await this.repository.getAlbum(id);
    if (!album) throw new HttpException('Album not found', 404);
    return this.repository.deleteAlbum(id);
  }
}
