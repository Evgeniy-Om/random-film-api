import { ApiProperty } from '@nestjs/swagger'

export class RegisterResponse {

    @ApiProperty({example: 'Вася Пупкин', description: 'Имя пользователя'})
    fullName: string

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    email: string

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtnamtqZ2hhMUBnbWFpbC5jb20iLCJzdWIiOjIsImlhdCI6MTY0NjA1MTIzMCwiZXhwIjoxNjQ4NjQzMjMwfQ.qTYj4-9tmcCG9ZUlz3eBC-COCvlpmfDetqExe3dYjWo', description: 'Access токен'})
    token: string
}
