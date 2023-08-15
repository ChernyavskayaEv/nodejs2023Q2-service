import { randomUUID } from 'crypto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Artist } from 'src/artist/entities/artist.entity';

@Entity()
@Entity('album', { schema: 'public'})
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true})
  @OneToOne(() => Artist)
  @JoinColumn()
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
