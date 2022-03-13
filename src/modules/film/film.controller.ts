import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { FilmService } from './film.service'
import { AddFilmToListDto } from './dto/add-film-to-list.dto'
import { UpdateFilmDto } from './dto/update-film.dto'
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
    //
    // @Get()
    // findAll() {
    //     return this.filmService.findAll()
    // }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.filmService.findOne(+id)
    }

    @Get()
    findByConditions(@Query() query: SearchFilmDto) {
        return this.filmService.findByConditions(query)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
        return this.filmService.update(+id, updateFilmDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.filmService.remove(+id)
    }
}
