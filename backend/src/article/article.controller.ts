// src/post/post.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Prisma } from '@prisma/client';

@Controller('posts')
export class ArticleController {
  constructor(private readonly postService: ArticleService) {}

  @Post()
  create(@Body() data: Prisma.ArticleCreateInput) {
    return this.postService.create(data);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ArticleUpdateInput) {
    return this.postService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}

