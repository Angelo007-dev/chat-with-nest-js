import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ArticleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createArticleDto: CreateArticleDto): Promise<{
        id: string;
        nom: string;
        quantity: number;
    }>;
    findAll(): Promise<{
        nom: string;
        quantity: number;
    }[]>;
    findOne(id: string): Promise<{
        nom: string;
        quantity: number;
    }>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<{
        id: string;
        nom: string;
        quantity: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        nom: string;
        quantity: number;
    }>;
    private checkExistingArticle;
    private checkArticle;
}
