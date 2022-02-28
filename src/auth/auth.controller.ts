import { Body, Controller, HttpCode, Post, Request, UseGuards, } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { RegisterResponse } from '../user/swagger/registerResponse'
import { LoginResponse } from '../user/swagger/loginResponse'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: 'Аутентификация пользователя'})
    @ApiResponse({status: 200, type: LoginResponse})
    @HttpCode(200)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @ApiOperation({summary: 'Регистрация нового пользователя'})
    @ApiResponse({status: 201, type: RegisterResponse})
    @Post('register')
    register(@Body() dto: CreateUserDto): Promise<RegisterResponse> {
        return this.authService.register(dto)
    }
}
