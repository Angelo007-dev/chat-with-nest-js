import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    //localhost:3000/users
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:userId')
    //localhost:3000/users
    getUser(@Param('userId') userId: string) {
        return this.userService.getUser(
            userId,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getAuthenticate(@Request() req) {
        const userId = req.user.userId;
        return this.userService.getUser(userId);
    }
}