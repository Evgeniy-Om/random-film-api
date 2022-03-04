import { ApiProperty } from '@nestjs/swagger'

export class GetProfileRequest {

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    email: string
}
