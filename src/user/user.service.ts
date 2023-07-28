import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'src/repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: Repository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = User.createFromDTO(createUserDto);
    await this.repository.saveUser(user);
    return user;
  }

  findAll(): User[] {
    return this.repository.getAllUsers();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.getUser(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.getUser(id);
    if (!user) throw new HttpException('User not found', 404);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException('Password incorrect', 403);
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    await this.repository.deleteUser(id);
    await this.repository.saveUser(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.repository.getUser(id);
    if (!user) throw new HttpException('User not found', 404);
    return this.repository.deleteUser(id);
  }
}
