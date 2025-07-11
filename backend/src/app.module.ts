import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { ArticleService } from './article/article.service';

@Module({
  imports: [UserModule, AuthModule, ArticleModule,ArticleModule],
  controllers: [],
  providers: [UserService, PrismaService,ArticleService],
})
export class AppModule { }
