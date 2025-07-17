import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<{
        id: string;
        email: string;
        firstname: string | null;
    }[]>;
    getUser(userId: string): Promise<{
        id: string;
        email: string;
        firstname: string | null;
    } | null>;
}
