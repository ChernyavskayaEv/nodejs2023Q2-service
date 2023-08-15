import { randomUUID } from 'crypto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Exclude } from 'class-transformer';

@Entity('track', { schema: 'public'})
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid', { name: 'artistid', nullable: true})
  @OneToOne(() => Artist)
  artistId: string | null;

  @Column('uuid', { name: 'albumid', nullable: true})
  @OneToOne(() => Album)
  albumId: string | null;

  @Column('integer')
  duration: number;

  @Column('boolean')
  @Exclude()
  favorite: boolean;


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
