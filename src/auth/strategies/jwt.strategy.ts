import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { FORBIDDEN } from '../auth.constants'
import { ConfigService } from '@nestjs/config'
import { LoginUserDto } from '../../user/dto/login-user.dto'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                if (!request?.cookies?.Authentication) {
                    throw new ForbiddenException("Срок действия access токена истёк. Перелогиньтесь")
                }
                return request?.cookies?.Authentication
            }]),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate({email}: Pick<LoginUserDto, 'email'>) {
        const user = await this.userService.findByCond({email})
        if (!user) {
            throw new ForbiddenException(FORBIDDEN)
        }

        return {
            id: user.id,
            email: user.email,
        }
    }
}
