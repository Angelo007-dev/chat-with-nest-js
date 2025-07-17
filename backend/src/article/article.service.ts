import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma.service';
import { Article } from 'generated/prisma';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) { };
  async create(createArticleDto: CreateArticleDto) {
    const check = await this.checkExistingArticle(createArticleDto.nom);
    if (check) {
      throw new ConflictException("This name is already used");
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
        id: true,
        nom: true,
        quantity: true,
      },
      orderBy: {
        nom: 'desc',
      }
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id: id },
      select: {
        id: true,
        nom: true,
        quantity: true,
      },
    });
    if (!article) {
      throw new NotFoundException('Article not Found');
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: id,
      }
    });
    if (!article) {
      throw new NotFoundException('Error on updtae');
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

  async remove(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id: id } });
    if (!article) {
      throw new NotFoundException('Error on delete');
    }

    return await this.prisma.article.delete({
      where: { id: id },
      select: {
        id: true,
        nom: true,
        quantity: true,
      }
    })
  }

  private async checkExistingArticle(nom: string) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { nom: nom },
    });
    return existingArticle;
  }

  private checkArticle(article: Article) {
    if (!article)
      throw new NotFoundException('Article not found')
  }
}
