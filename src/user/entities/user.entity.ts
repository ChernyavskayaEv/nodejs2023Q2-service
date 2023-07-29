import { randomUUID } from 'crypto';
import { CreateUserDto } from './../dto/create-user.dto';
import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  static createFromDTO(dto: CreateUserDto): User {
    const user = new User();
    user.id = randomUUID();
    user.login = dto.login;
    user.password = dto.password;
    user.version = 1;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();

    return user;
  }
}
