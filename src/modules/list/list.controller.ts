import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post, Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import ListService from './list.service'
import CreateListDto from './dto/createList.dto'
import UpdateListDto from './dto/updateList.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import FindOneParams from '../../utils/FindOneParams'
import RequestWithUser from '../../types/requestWithUser.interface'

@Controller('lists')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export default class ListController {
    constructor(
        private readonly listService: ListService
    ) {
    }

    @Get()
    findMyLists(@Request() req: RequestWithUser) {
        return this.listService.findMyLists(req.user.id)
    }

    @Get(':id')
    findListById(@Param() {id}: FindOneParams) {
        return this.listService.findListById(Number(id))
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createList(@Request() req: RequestWithUser, @Body() list: CreateListDto) {
        const payload = {...list, userId: req.user.id}
        return this.listService.createList(payload)
    }

    @Patch(':id')
    async updateList(@Param() {id}: FindOneParams, @Body() list: UpdateListDto) {
        return this.listService.updateList(Number(id), list)
    }

    @Delete(':id')
    async deleteList(@Param() {id}: FindOneParams) {
        return this.listService.deleteList(Number(id))
    }
}
