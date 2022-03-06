import { IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsEmail(undefined, {message: 'Неверная формат почты'})
    email: string

    @ApiProperty({example: '#dfQ&ds', description: 'Пароль'})
    password?: string
}
