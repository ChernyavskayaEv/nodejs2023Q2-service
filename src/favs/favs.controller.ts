import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  HttpException,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { FavsService } from './favs.service';

const categories = ['album', 'artist', 'track'];

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/:category/:id')
  async create(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('category') category: string,
  ) {
    if (!categories.includes(category)) throw new NotFoundException();
    try {
      return await this.favsService.create(id, category);
    } catch (error) {
      if (error.message === '422')
        throw new HttpException('Record not exists', 422);
    }
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @HttpCode(204)
  @Delete('/:category/:id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('category') category: string,
  ) {
    if (!categories.includes(category)) throw new NotFoundException();

    return this.favsService.remove(id, category);
  }
}
