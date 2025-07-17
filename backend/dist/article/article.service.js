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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ArticleService = class ArticleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ;
    async create(createArticleDto) {
        const check = await this.checkExistingArticle(createArticleDto.nom);
        if (check) {
            throw new common_1.ConflictException("This name is already used");
        }
        const article = await this.prisma.article.create({
            data: {
                nom: createArticleDto.nom,
                quantity: createArticleDto.quantity,
            }, select: {
                id: true,
                nom: true,
                quantity: true,
            },
        });
        return article;
    }
    async findAll() {
        return await this.prisma.article.findMany({
            select: {
                nom: true,
                quantity: true,
            },
            orderBy: {
                nom: 'desc',
            }
        });
    }
    async findOne(id) {
        const article = await this.prisma.article.findUnique({
            where: { id: id },
            select: {
                nom: true,
                quantity: true,
            },
        });
        if (!article) {
            throw new common_1.NotFoundException('Article not Found');
        }
        return article;
    }
    async update(id, updateArticleDto) {
        const article = await this.prisma.article.findUnique({
            where: {
                id: id,
            }
        });
        if (!article) {
            throw new common_1.NotFoundException('Error on updtae');
        }
        return await this.prisma.article.update({
            where: {
                id: id,
            }, data: {
                nom: updateArticleDto.nom,
                quantity: updateArticleDto.quantity,
            }
        });
    }
    async remove(id) {
        const article = await this.prisma.article.findUnique({ where: { id } });
        if (!article) {
            throw new common_1.NotFoundException('Error on updtae');
        }
        return await this.prisma.article.delete({
            where: { id: id },
            select: {
                id: true,
                nom: true,
                quantity: true,
            }
        });
    }
    async checkExistingArticle(nom) {
        const existingArticle = await this.prisma.article.findUnique({
            where: { nom: nom },
        });
        return existingArticle;
    }
    checkArticle(article) {
        if (!article)
            throw new common_1.NotFoundException('Article not found');
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticleService);
//# sourceMappingURL=article.service.js.map