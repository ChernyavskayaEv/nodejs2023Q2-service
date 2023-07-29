import { Album } from './album/entities/album.entity';
import { Injectable } from '@nestjs/common';

interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class Repository {
  private users = new Map<string, User>();
  private tracks = new Map<string, Track>();
  private artists = new Map<string, Artist>();
  private albums = new Map<string, Album>();

  getAllUsers() {
    return [...this.users.values()];
  }

  async saveUser(user: User) {
    this.users.set(user.id, user);
  }

  async getUser(id: string): Promise<User> {
    return this.users.get(id);
  }

  async deleteUser(id: string): Promise<void> {
    this.users.delete(id);
  }

  getAllTracks() {
    return [...this.tracks.values()];
  }

  async saveTrack(track: Track) {
    this.tracks.set(track.id, track);
  }

  async getTrack(id: string): Promise<Track> {
    return this.tracks.get(id);
  }

  async deleteTrack(id: string): Promise<void> {
    this.tracks.delete(id);
  }

  getAllArtists() {
    return [...this.artists.values()];
  }

  async saveArtist(artist: Artist) {
    this.artists.set(artist.id, artist);
  }

  async getArtist(id: string): Promise<Artist> {
    return this.artists.get(id);
  }

  async deleteArtist(id: string): Promise<void> {
    this.artists.delete(id);
  }

  getAllAlbums() {
    return [...this.albums.values()];
  }

  async saveAlbum(album: Album) {
    this.albums.set(album.id, album);
  }

  async getAlbum(id: string): Promise<Album> {
    return this.albums.get(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    this.albums.delete(id);
  }
}
