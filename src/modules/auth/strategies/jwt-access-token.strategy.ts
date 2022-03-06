import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { FORBIDDEN } from '../auth.constants'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import TokenPayload from '../../../types/tokenPayload.interface'

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                if (!request?.cookies?.Authentication) {
                    throw new ForbiddenException('Срок действия access-токена истёк. Перелогиньтесь')
                }
                return request?.cookies?.Authentication
            }]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
        })
    }

    async validate(payload: TokenPayload) {
        const user = await this.userService.findById(payload.userId)
        if (!user) {
            throw new ForbiddenException(FORBIDDEN)
        }

        return {
            id: user.id,
            email: user.email,
        }
    }
}
