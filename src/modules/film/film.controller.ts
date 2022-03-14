import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { FilmService } from './film.service'
import { AddFilmToListDto } from './dto/add-film-to-list.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { SearchFilmDto } from './dto/searchg-film.dto'

@Controller('film')
@UseGuards(JwtAuthGuard)
export class FilmController {
    constructor(private readonly filmService: FilmService) {
    }

    @Post()
    addToList(@Body() addFilmToListDto: AddFilmToListDto) {
        return this.filmService.addToList(addFilmToListDto)
    }

    @Get()
    findByConditions(@Query() query: SearchFilmDto) {
        return this.filmService.findByConditions(query)
    }
}
