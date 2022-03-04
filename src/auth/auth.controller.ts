import { Body, Controller, HttpCode, Post, Req, Res, UseGuards, } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { RegisterResponse } from '../user/swagger/registerResponse'
import { LoginResponse } from '../user/swagger/loginResponse'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: 'Аутентификация пользователя'})
    @ApiBody({type: LoginUserDto})
    @ApiResponse({status: 200, type: LoginResponse})
    @HttpCode(200)
    // async login(@Req() req) {
    //     console.log(req)
    //     return this.authService.login(req.user)
    // }
    // async login(@Request() req): Promise<LoginResponse> {
    //     return this.authService.login(req.user)
    // }
    async login(@Req() request, @Res() response: Response) {
        const {user} = request
        const cookie = this.authService.getCookieWithJwtToken(user.email)
        response.setHeader('Set-Cookie', cookie)
        return response.send(user)
    }

    @Post('register')
    @ApiOperation({summary: 'Регистрация нового пользователя'})
    @ApiResponse({status: 201, type: RegisterResponse})
    register(@Body() dto: CreateUserDto): Promise<RegisterResponse> {
        return this.authService.register(dto)
    }
}
