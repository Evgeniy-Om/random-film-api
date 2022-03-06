import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokensRequest {

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    email: string
}
