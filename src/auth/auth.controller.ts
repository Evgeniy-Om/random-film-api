import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { RegisterResponse } from '../user/swagger/registerResponse'
import { LoginResponse } from '../user/swagger/loginResponse'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { Response } from 'express'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import RequestWithUser from '../types/requestWithUser.interface'
import { UserService } from '../user/user.service'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: 'Аутентификация пользователя'})
    @ApiBody({type: LoginUserDto})
    @ApiResponse({status: 200, type: LoginResponse})
    @HttpCode(200)
    async logIn(@Req() request: RequestWithUser) {
        const {user} = request
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id)
        const {
            cookie: refreshTokenCookie,
            token: refreshToken
        } = this.authService.getCookieWithJwtRefreshToken(user.id)

        await this.userService.setCurrentRefreshToken(refreshToken, user.id)

        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
        return user
    }

    @Post('register')
    @ApiOperation({summary: 'Регистрация нового пользователя'})
    @ApiResponse({status: 201, type: RegisterResponse})
    register(@Body() dto: CreateUserDto): Promise<RegisterResponse> {
        return this.authService.register(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut())
        return response.sendStatus(200)
    }
}
