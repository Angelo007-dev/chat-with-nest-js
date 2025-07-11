import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export enum  Role{
    USER ='USER',
    ADMIN = 'ADMIN',
}

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    firstname: string;
    
    @IsOptional()
    @IsEnum(Role)
    role?:Role;
}