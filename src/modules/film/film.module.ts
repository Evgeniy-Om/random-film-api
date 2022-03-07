import { Module } from '@nestjs/common'
import { FilmService } from './film.service'
import { FilmController } from './film.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmEntity } from './entities/film.entity'
import ListService from '../list/list.service'
import { ListEntity } from '../list/entities/list.entity'

@Module({
    imports: [TypeOrmModule.forFeature([FilmEntity, ListEntity])],
    controllers: [FilmController],
    providers: [FilmService, ListService]
})
export class FilmModule {
}
