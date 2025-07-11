import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

export type AuthBody = { email: string, password: string }

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    //localhost:3001/auth/login
    @Post('login')
    async login(@Body() authBody: AuthBody) {

        return await this.authService.login(
            authBody,
        )
    }
    //localhost:3001/auth/register
    @Post('rergister')
    async register(@Body() dto: CreateUserDto) {

        return await this.authService.register(
            dto,
        )
    }
}
