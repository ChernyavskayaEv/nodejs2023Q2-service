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

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

const users = new Map<string, User>();
const tracks = new Map<string, Track>();
const artists = new Map<string, Artist>();
const albums = new Map<string, Album>();
const favorites = { artists: [], albums: [], tracks: [] };

@Injectable()
export class Repository {
  // private users = new Map<string, User>();
  // private tracks = new Map<string, Track>();
  // private artists = new Map<string, Artist>();
  // private albums = new Map<string, Album>();
  // private favorites = { artists: [], albums: [], tracks: [] };

  getAllUsers() {
    return [...users.values()];
  }

  async saveUser(user: User) {
    users.set(user.id, user);
  }

  async getUser(id: string): Promise<User> {
    return users.get(id);
  }

  async deleteUser(id: string): Promise<void> {
    users.delete(id);
  }

  getAllTracks() {
    return [...tracks.values()];
  }

  async saveTrack(track: Track) {
    tracks.set(track.id, track);
  }

  async getTrack(id: string): Promise<Track> {
    return tracks.get(id);
  }

  async deleteTrack(id: string): Promise<void> {
    this.deleteFavorite(id, 'track');
    tracks.delete(id);
  }

  getAllArtists() {
    return [...artists.values()];
  }

  async saveArtist(artist: Artist) {
    artists.set(artist.id, artist);
  }

  async getArtist(id: string): Promise<Artist> {
    return artists.get(id);
  }

  async deleteArtist(id: string): Promise<void> {
    for (let track of tracks.values()) {
      if (track.artistId === id) track.artistId = null;
    }
    for (let album of albums.values()) {
      if (album.artistId === id) album.artistId = null;
    }
    this.deleteFavorite(id, 'artist');
    artists.delete(id);
  }

  getAllAlbums() {
    return [...albums.values()];
  }

  async saveAlbum(album: Album) {
    albums.set(album.id, album);
  }

  async getAlbum(id: string): Promise<Album> {
    return albums.get(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    for (let track of tracks.values()) {
      if (track.albumId === id) track.albumId = null;
    }
    this.deleteFavorite(id, 'album');
    albums.delete(id);
  }

  getAllFavorites() {
    const favoritesResponse = {};
    for (const key in favorites) {
      favoritesResponse[key] = favorites[key].map((x) => {
        switch (key) {
          case 'artists':
            return artists.get(x);
          case 'albums':
            return albums.get(x);
          case 'tracks':
            return tracks.get(x);
        }
      });
    }
    return favoritesResponse;
  }

  async saveFavorite(id: string, category: string) {
    category = category + 's';

    let record = null;
    switch (category) {
      case 'artists':
        record = artists.get(id);
        break;
      case 'albums':
        record = albums.get(id);
        break;

      case 'tracks':
        record = tracks.get(id);
        break;
    }
    if (!record) throw new Error('422');
    favorites[category].push(id);
    return record;
  }

  async deleteFavorite(id: string, category: string) {
    category = category + 's';
    favorites[category] = favorites[category].filter((x) => x != id);
  }
}
