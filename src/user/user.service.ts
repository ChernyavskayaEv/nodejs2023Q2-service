import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = User.createFromDTO(createUserDto);
    const result = await this.repository.save(user);
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', 404);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException('Password incorrect', 403);
    user.password = updateUserDto.newPassword;
    user.updatedAt = new Date();
    user.version++;
    await this.repository.update({ id }, user);
    return user;
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', 404);
    return this.repository.delete(id);
  }
}
