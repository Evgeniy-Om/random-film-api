import { Body, Controller, Get, Param, Patch, Query, Request, UseGuards, } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { SearchUserDto } from './dto/searchg-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './entities/user.entity'

@Controller('users')
@ApiTags('Пользователи')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [UserEntity]})
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll()
    }

    @Get('me')
    @ApiOperation({summary: 'Получение данные о своём профиле'})
    @ApiResponse({status: 200, type: UserEntity})
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return this.userService.findById(req.user.id)
    }

    @Patch('me')
    @UseGuards(JwtAuthGuard)
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+req.user.id, updateUserDto)
    }

    @Get('search')
    search(@Query() dto: SearchUserDto) {
        return this.userService.search(dto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findById(+id)
    }
}
