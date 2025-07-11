import { ConflictException, Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService:JwtService) { }

    async register(dto: CreateUserDto) {
        //check double
        const check = await this.checkExistingUser(dto.email);
        if (check) {
            throw new ConflictException('Email already exist');
        }
        const hashed = await this.hashPasssword(dto.password);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashed,
                firstname: dto.firstname,
                role: dto.role ?? 'USER',
            }, select: {
                id: true,
                email: true,
                firstname: true,
                role: true,
            },
        });
        return user;
    }

    async login( authBody:AuthBody ) {
        const { email, password } = authBody; //to destruct the object authBody--> important terme

        const hashedPass = await this.hashPasssword(password);
        console.log({ hashedPass, password });
        const existingUser = await this.checkExistingUser(email);
        if (!existingUser) {
            throw new Error("User not exist");
        }
        const isPasswordValid = await this.isValidPass(
            password,
            hashedPass,
        );
        if (!isPasswordValid) {
            throw new Error("Wrong password");
        };
        //For the token
        const payload = {email: existingUser.email,sub: existingUser.id} 
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,  
            user:{
                id:existingUser.id,
                email: existingUser.email,
                firstname:existingUser.firstname,
                role:existingUser.role
            },
        };
    }

    private async hashPasssword(password: string) {
        const hashedPass = await hash(password, 10);
        return hashedPass;
    }
    private async isValidPass(password: string, hashedPassword: string) {
        const isValidPass = await compare(password, hashedPassword);
        return isValidPass;
    }
    private async checkExistingUser(email: string) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: email },
        });
        return existingUser;
    }
}
