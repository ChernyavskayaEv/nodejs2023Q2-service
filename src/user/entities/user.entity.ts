import { randomUUID } from 'crypto';
import { CreateUserDto } from './../dto/create-user.dto';
import { Exclude, Type } from 'class-transformer';
import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity('user', { schema: 'public'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('varchar', { length: 100 })
  login: string;

  @Exclude()
  @Column('varchar', { length: 50})
  password: string;

  @Column('integer')
  version: number;
  
  @Column('timestamp', { name: 'createdat'})
  @Type(() => Date)
  createdAt: Date;

  @Column('timestamp', { name: 'updatedat'})
  @Type(() => Date)
  updatedAt: Date;

  static createFromDTO(dto: CreateUserDto): User {
    const user = new User();
    user.id = randomUUID();
    user.login = dto.login;
    user.password = dto.password;
    user.version = 1;

    return user;
  }
}
