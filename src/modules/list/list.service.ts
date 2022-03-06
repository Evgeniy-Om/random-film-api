import { Injectable } from '@nestjs/common'
import UpdateListDto from './dto/updateList.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import ListNotFoundException from './exceptions/listNotFound.exception'
import { ListEntity } from './entities/list.entity'
import { DuplicateNameListException } from './exceptions/duplicateNameList.exception'

@Injectable()
export default class ListService {

    constructor(
        @InjectRepository(ListEntity)
        private listRepository: Repository<ListEntity>
    ) {
    }

    findMyLists(user: number): Promise<ListEntity[]> {
        return this.listRepository.find({where: {user}})
    }

    async findListById(id: number): Promise<ListEntity> {
        const list = await this.listRepository.findOne(
            id,
            {
                relations: ['list'],
                withDeleted: true
            }
        )
        if (list) {
            return list
        }
        throw new ListNotFoundException(id)
    }

    async findListByName(name: string): Promise<boolean> {
        const list = await this.listRepository.findOne(name)
        if (list) {
            throw new DuplicateNameListException(name)
        }
        return false
    }

    async restoreDeletedList(id: number) {
        const restoreResponse = await this.listRepository.restore(id)
        if (!restoreResponse.affected) {
            throw new ListNotFoundException(id)
        }
    }

    async createList(list: { name: string, userId: number }) {
        console.log(list)
        const isDuplicateList = await this.listRepository.findOne({
            where: {
                name: list.name,
                user: {id: list.userId}
            }
        })
//         const isDuplicateList = await this.listRepository.query(
//             `SELECT id
//                    FROM list
//                    WHERE 'name' = ${list.name} AND 'userId' = ${list.name}
// `
//         )
        console.log(isDuplicateList)
        if (isDuplicateList) {
            throw new DuplicateNameListException(list.name)
        }
        return this.listRepository.save({name: list.name, user: {id: list.userId}})
    }

    async updateList(id: number, list: UpdateListDto): Promise<ListEntity> {
        await this.listRepository.update(id, list)
        const updatedList = await this.listRepository.findOne(id, {relations: ['list']})
        if (updatedList) {
            return updatedList
        }
        throw new ListNotFoundException(id)
    }

    async deleteList(id: number): Promise<void> {
        const deleteResponse = await this.listRepository.softDelete(id)
        if (!deleteResponse.affected) {
            throw new ListNotFoundException(id)
        }
    }
}
