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
import { ClubController } from './club/club.controller';
import { UserService } from './user/user.service';
import { ClubService } from './club/club.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';

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
    UserController,
    ClubController,
    AddressController
  ],
  providers: [
    DatabaseService,
    UserService,
    ClubService,
    AddressService
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
