import { Injectable } from '@nestjs/common'
import { AddFilmToListDto } from './dto/add-film-to-list.dto'
import { UpdateFilmDto } from './dto/update-film.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FilmEntity } from './entities/film.entity'
import ListService from '../list/list.service'
import { SearchFilmDto } from './dto/searchg-film.dto'

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

    async findByConditions(dto: SearchFilmDto) {
        const qb = this.filmRepository.createQueryBuilder('film');

        qb.leftJoinAndSelect('film.genres', 'genres');
        qb.leftJoinAndSelect('film.countries', 'countries');

        qb.setParameters({
            yearFrom: new Date(dto.yearFrom),
            yearTo: new Date(dto.yearTo),
            ratingFrom: dto.ratingFrom,
            ratingTo: dto.ratingTo,
            country: dto.country,
            genre: dto.genre
        });
        qb.andWhere(`film.release_date BETWEEN :yearFrom AND :yearTo`);
        qb.andWhere(`film.vote_average BETWEEN :ratingFrom AND :ratingTo`);

        if (dto.country) {
            qb.andWhere(`countries.id = :country`);
        }

        if (dto.genre) {
            qb.andWhere(`genres.id = :genre`);
        }

        // qb.limit( 2);
        qb.skip(2)
        qb.take(10);


        const [items, total] = await qb.getManyAndCount();

        return { items, total };
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
