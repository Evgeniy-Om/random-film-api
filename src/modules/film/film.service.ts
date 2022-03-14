import { Injectable } from '@nestjs/common'
import { AddFilmToListDto } from './dto/add-film-to-list.dto'
import { UpdateFilmDto } from './dto/update-film.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FilmEntity } from './entities/film.entity'
import ListService from '../list/list.service'

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(FilmEntity)
        private readonly filmRepository: Repository<FilmEntity>,
        private readonly listService: ListService
    ) {
    }

    async addToList(addFilmToListDto: AddFilmToListDto) {
        console.log(addFilmToListDto)
        let film = await this.filmRepository.findOne(addFilmToListDto.filmId)
        const list = await this.listService.findListById(addFilmToListDto.listId)

        film.lists = [list]

        return this.filmRepository.save(film)
    }

    findAll() {
        return `This action returns all film`
    }

    findOne(id: number) {
        return `This action returns a #${id} film`
    }

    update(id: number, updateFilmDto: UpdateFilmDto) {
        return `This action updates a #${id} film`
    }

    remove(id: number) {
        return `This action removes a #${id} film`
    }
}
