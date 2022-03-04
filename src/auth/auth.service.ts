import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { UserEntity } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { RegisterResponse } from '../user/swagger/registerResponse'
import * as bcrypt from 'bcryptjs'
import { compare } from 'bcryptjs'
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from './auth.constants'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    getCookieWithJwtToken(email: string) {
        const token = this.jwtService.sign({email});
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    private generateJwtToken(data: { id: number; email: string }) {
        const payload = {email: data.email, sub: data.id}
        return this.jwtService.sign(payload)
    }

    async register(dto: CreateUserDto): Promise<RegisterResponse> {
        try {
            const hashedPassword = await bcrypt.hash(dto.password, 10)
            const createdUser = await this.userService.create({
                email: dto.email,
                fullName: dto.fullName,
                password: hashedPassword,
            })
            return {
                email: createdUser.email,
                fullName: createdUser.fullName,
                token: this.generateJwtToken(createdUser),
            }
        } catch (err) {
            throw new ForbiddenException('Ошибка при регистрации')
        }
    }

    async validateUser(email: string, password: string): Promise<Pick<UserEntity, 'email'>> {
        const user = await this.userService.findByCond({email})
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }

        const isCorrectPassword = await compare(password, user.password)
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
        }
        return {email: user.email}
    }

}
