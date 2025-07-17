import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post('new')
  //localhost:3001/article/new
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Get()
  //localhost:3001/article
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  //localhost:3001/article
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Patch(':id')
  //localhost:3001/article/
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  //localhost:3001/article/
  async remove(@Param('id') id: string) {
    return await this.articleService.remove(id);
  }
}
