import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports:[PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions:{expiresIn:'1h'},
    })
  ],
  controllers: [AuthController],
  providers: [{
    provide: APP_GUARD,
    useClass:RolesGuard,
  },AuthService, PrismaService,]
})
export class AuthModule { }
