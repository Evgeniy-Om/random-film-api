import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { RegisterResponse } from '../user/swagger/registerResponse'
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config'
import TokenPayload from '../types/tokenPayload.interface'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
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
                // token: this.generateJwtToken(createdUser),
            }

        } catch (err) {
            throw new ForbiddenException('Ошибка при регистрации')
        }
    }

    getCookieWithJwtAccessToken(userId: number) {
        const payload: TokenPayload = {userId}
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
        })
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`
    }

    getCookieWithJwtRefreshToken(userId: number) {
        const payload: TokenPayload = {userId}
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        })
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`
        return {
            cookie,
            token
        }
    }

    getCookiesForLogOut() {
        return [
            'Authentication=; HttpOnly; Path=/; Max-Age=0',
            'Refresh=; HttpOnly; Path=/; Max-Age=0'
        ]
    }
}