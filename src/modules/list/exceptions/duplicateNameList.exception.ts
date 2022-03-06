import { NotFoundException } from '@nestjs/common'

export class DuplicateNameListException extends NotFoundException {
    constructor(listId: string) {
        super(`Лист с именем ${listId} уже сушествует`)
    }
}

