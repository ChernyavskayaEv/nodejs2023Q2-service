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

@Injectable()
export class Repository {
  private users = new Map<string, User>();
  private tracks = new Map<string, Track>();

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
}
