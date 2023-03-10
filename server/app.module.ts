import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppServerModule } from '../src/main.server';

import { AuthModule } from './auth/auth.module';

import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/website/browser')
    }),
    ConfigModule.forRoot(),
    AuthModule
  ],
  providers: [
    DatabaseService
  ]
})
export class AppModule {}
