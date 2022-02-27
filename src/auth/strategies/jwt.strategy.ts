import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { FORBIDDEN } from '../auth.constants'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: { sub: number; email: string }) {
        const data = {id: payload.sub, email: payload.email}

        const user = await this.userService.findByCond(data)

        if (!user) {
            throw new ForbiddenException(FORBIDDEN)
        }

        return {
            id: user.id,
            email: user.email,
        }
    }
}
