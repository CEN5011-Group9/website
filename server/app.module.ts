import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppServerModule } from '../src/main.server';

import { AuthModule } from './auth/auth.module';

import { DatabaseService } from './database/database.service';

import { SearchModule } from './search/search.module';
import { UserController } from './user/user.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/website/browser')
    }),
    ConfigModule.forRoot(),
    AuthModule,
    SearchModule
  ],
  controllers: [
    UserController
  ],
  providers: [
    DatabaseService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ],
  exports: [
    DatabaseService
  ]
})
export class AppModule {}
