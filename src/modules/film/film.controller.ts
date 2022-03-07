import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { FilmService } from './film.service'
import { AddFilmToListDto } from './dto/add-film-to-list.dto'
import { UpdateFilmDto } from './dto/update-film.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

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
    findAll() {
        return this.filmService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.filmService.findOne(+id)
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
