import { IsEmail, Length, ValidationArguments } from 'class-validator'
import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation'
import { UserEntity } from '../entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

const minLengthFullName = Number(process.env.MIN_LENGTH_FULLNAME) || 4
const maxLengthFullName = Number(process.env.MAX_LENGTH_FULLNAME) || 50
const minLengthPassword = Number(process.env.MIN_LENGTH_PASSWORD) || 6
const maxLengthPassword = Number(process.env.MAX_LENGTH_PASSWORD) || 50

export class CreateUserDto {

    @ApiProperty({example: 'Вася Пупкин', description: 'Имя пользователя'})
    @Length(minLengthFullName, maxLengthFullName, {
        message: (args: ValidationArguments) => {
            if (!args.value) {
                return 'Обязательное поле'
            }
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
        message: 'Ппользователь с таким емейлом уже был зарегистрирован',
    })
    email: string

    @ApiProperty({example: '#dfQ&ds', description: 'Пароль'})
    @Length(minLengthPassword, maxLengthPassword, {
        message: (args: ValidationArguments) => {
            if (!args.value) {
                return 'Обязательное поле'
            }
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
