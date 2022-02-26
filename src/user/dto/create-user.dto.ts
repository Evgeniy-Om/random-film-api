import { IsEmail, Length, ValidationArguments } from 'class-validator'
import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation'
import { UserEntity } from '../entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({example: 'Вася Пупкин', description: 'Имя пользователя'})
    @Length(4, 50, {
        message: (args: ValidationArguments) => {
            if (!args.value) return 'Пароль обязателен'
            if (args.value.length < args.constraints[0]) {
                return `Имя должно быть не менее ${args.constraints[0]} символов`
            }
            if (args.value.length > args.constraints[1]) {
                return `Имя должно быть не более ${args.constraints[1]} символов`
            }
        }
    })
    fullName: string

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsEmail(undefined, {
        message: (args: ValidationArguments) => {
            if (!args.value) {
                return 'Обязательное поле'
            }
            return 'Неверный формат почты'
        }
    })
    @UniqueOnDatabase(UserEntity, {
        message: 'Такая почта уже есть',
    })
    email: string

    @ApiProperty({example: '#dfQ&ds', description: 'Пароль'})
    @Length(4, 30, {
        message: (args: ValidationArguments) => {
            if (!args.value) return 'Пароль обязателен'
            if (args.value.length < args.constraints[0]) {
                return `Пароль должен быть не менее ${args.constraints[0]} символов`
            }
            if (args.value.length > args.constraints[1]) {
                return `Пароль должен быть не более ${args.constraints[1]} символов`
            }
        }
    })
    password: string
}
