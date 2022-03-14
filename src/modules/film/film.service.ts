import { Injectable } from '@nestjs/common'
import { AddFilmToListDto } from './dto/add-film-to-list.dto'
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
        // Получение ID-шников фильмов подпадающих под условия
        const qb = this.filmRepository.createQueryBuilder('film')
            .select(['film.id'])
            .innerJoin('film.genres', 'genres')
            .innerJoin('film.countries', 'countries')
            .where(`film.release_date BETWEEN :yearFrom AND :yearTo`)
            .andWhere(`film.vote_average BETWEEN :ratingFrom AND :ratingTo`)
            .setParameters({
                yearFrom: new Date(dto.yearFrom),
                yearTo: new Date(dto.yearTo),
                ratingFrom: dto.ratingFrom,
                ratingTo: dto.ratingTo,
                country: dto.country,
                genre: dto.genre,
            })
            .skip(dto.skip || 0)
            .take(dto.take || 100)

        if (dto.country) {
            qb.andWhere(`countries.id = :country`)
        }

        if (dto.genre) {
            qb.andWhere(`genres.id = :genre`)
        }

        const [filmIds, total] = await qb.getManyAndCount()


        //Получение данных по этим фильмам
        const items = await this.filmRepository.createQueryBuilder('film')
            .select([
                'film.id',
                'film.title',
                'film.release_date',
                'film.poster_path',
                'film.vote_average',
                'film.vote_count',
                'countries',
                'genres'
            ])
            .innerJoin('film.genres', 'genres')
            .innerJoin('film.countries', 'countries')
            .whereInIds(filmIds)
            .getMany()

        // преобразую массив объектов стран и жанров в массивы строк с названием стран и жанров
        const listFilms = items.map(f => ({
            ...f,
            release_date: f.release_date.getFullYear(),
            countries: f.countries.map(c => c.name_ru),
            genres: f.genres.map(g => g.name),

        }))

        return {listFilms, total}
    }
}
