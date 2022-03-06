import { Injectable } from '@nestjs/common';
import { AddFilmToListDto } from './dto/add-film-to-list.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FilmEntity } from './entities/film.entity'

@Injectable()
export class FilmService {
  constructor(
      @InjectRepository(FilmEntity)
      private filmRepository: Repository<FilmEntity>,
  ) {}

  addToList(addFilmToListDto: AddFilmToListDto) {
    // return this.filmRepository.save({
    //   id: addFilmToListDto.listId,
    //   lists: {id: addFilmToListDto.listId}
    // });
  }

  findAll() {
    return `This action returns all film`;
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
