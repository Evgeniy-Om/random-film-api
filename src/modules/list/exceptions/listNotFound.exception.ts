import { NotFoundException } from '@nestjs/common'

class ListNotFoundException extends NotFoundException {
    constructor(listId: number) {
        super(`Лист с id ${listId} не найден`)
    }
}

export default ListNotFoundException