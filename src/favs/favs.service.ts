import { Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';

@Injectable()
export class FavsService {
  constructor(private repository: Repository) {}

  async create(id: string, category: string): Promise<any> {
    return await this.repository.saveFavorite(id, category);
  }

  findAll() {
    return this.repository.getAllFavorites();
  }

  remove(id: string, category: string) {
    return this.repository.deleteFavorite(id, category);
  }
}
