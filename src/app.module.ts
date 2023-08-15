import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { Repository } from './repository';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { User } from './user/entities/user.entity';
import { Track } from './track/entities/track.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env['POSTGRES_HOST'] || 'localhost',
    port: +process.env['POSTGRES_PORT'] || 5432,
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: [Artist, Album, User, Track],
    synchronize: false,
  }),
    UserModule, ArtistModule, TrackModule, AlbumModule, FavsModule],
  controllers: [AppController],
  providers: [AppService, Repository],
})
export class AppModule {}
