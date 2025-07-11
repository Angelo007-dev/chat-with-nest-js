export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class CreateUserDto {
    email: string;
    password: string;
    firstname: string;
    role?: Role;
}
