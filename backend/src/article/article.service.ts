import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ArticleCreateInput) {
    return this.prisma.article.create({ data });
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.PostUpdateInput) {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({ where: { id } });
  }
}

