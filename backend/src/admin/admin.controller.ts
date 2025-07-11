
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller()
@UseGuards(JwtAuthGuard,RolesGuard)
export class AdminController{
    @Get('path')
    @Roles('ADMIN')
    getAdminDashboard(@Request() req){
        return{
            message: `Welcome admin ${req.user.email}`,
            user: req.user,
        };
    }
}