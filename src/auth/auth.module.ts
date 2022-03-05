import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy'
import { ConfigService } from '@nestjs/config'
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy'

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, ConfigService, LocalStrategy, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {
}
