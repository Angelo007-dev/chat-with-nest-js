import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        firstname: string | null;
        role: import("generated/prisma").$Enums.Role;
    }>;
    login(authBody: AuthBody): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstname: string | null;
            role: import("generated/prisma").$Enums.Role;
        };
    }>;
    private hashPasssword;
    private isValidPass;
    private checkExistingUser;
}
