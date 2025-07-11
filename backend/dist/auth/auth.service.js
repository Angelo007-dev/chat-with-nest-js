"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const check = await this.checkExistingUser(dto.email);
        if (check) {
            throw new common_1.ConflictException('Email already exist');
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
    async login(authBody) {
        const { email, password } = authBody;
        const existingUser = await this.checkExistingUser(email);
        if (!existingUser) {
            throw new common_1.NotFoundException("User not exist");
        }
        const isPasswordValid = await this.isValidPass(password, existingUser.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Wrong password");
        }
        ;
        const payload = { email: existingUser.email, sub: existingUser.id };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user: {
                id: existingUser.id,
                email: existingUser.email,
                firstname: existingUser.firstname,
                role: existingUser.role
            },
        };
    }
    async hashPasssword(password) {
        const hashedPass = await (0, bcrypt_1.hash)(password, 10);
        return hashedPass;
    }
    async isValidPass(password, hashedPassword) {
        const isValidPass = await (0, bcrypt_1.compare)(password, hashedPassword);
        return isValidPass;
    }
    async checkExistingUser(email) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: email },
        });
        return existingUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map