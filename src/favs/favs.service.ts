import { Injectable } from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { DataSource } from 'typeorm';

const entityMap = new Map()
.set('album', Album)
.set('track', Track)
.set('artist', Artist);

@Injectable()
export class FavsService {
  constructor(private dataSource: DataSource) {}

  async create(id: string, category: string): Promise<any> {
    const entity = entityMap.get(category);
    const record = this.dataSource.manager.findOneBy(entity, { id });
    if (!record) throw new Error('422');
    return await this.dataSource.manager.update(entity, { id }, {favorite: true});
  }

  async findAll() {
    const albums = await this.dataSource.manager.find(Album, { where : { favorite: true }});
    const artists = await this.dataSource.manager.find(Artist, { where:  {favorite: true }});
    const tracks = await this.dataSource.manager.find(Track, { where: { favorite: true }});
    return { albums, artists, tracks };
  }

  remove(id: string, category: string) {
    const entity = entityMap.get(category);
    return this.dataSource.manager.update(entity, { id }, { favorite: false});
  }
}
