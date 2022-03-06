import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { USER_NOT_FOUND, WRONG_LOGIN_OR_PASSWORD_ERROR } from '../auth.constants'
import { compare } from 'bcryptjs'
import { UserService } from '../../user/user.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({usernameField: 'email'})
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.userService.findByCond({email})
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }

        const isCorrectPassword = await compare(password, user.password)
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_LOGIN_OR_PASSWORD_ERROR)
        }
        return user
    }
}
