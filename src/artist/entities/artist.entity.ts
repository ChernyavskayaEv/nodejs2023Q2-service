import { randomUUID } from 'crypto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity('artist', { schema: 'public'})
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('integer')
  name: string;
  
  @Column('boolean')
  grammy: boolean;

  @Column('boolean')
  @Exclude()
  favorite: boolean;

  static createFromDTO(dto: CreateArtistDto): Artist {
    const artist = new Artist();
    artist.id = randomUUID();
    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return artist;
  }
}
