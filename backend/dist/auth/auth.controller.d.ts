import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export type AuthBody = {
    email: string;
    password: string;
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authBody: AuthBody): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstname: string | null;
            role: import("generated/prisma").$Enums.Role;
        };
    }>;
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        firstname: string | null;
        role: import("generated/prisma").$Enums.Role;
    }>;
}
