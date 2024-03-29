import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DatabaseService } from '../database/database.service';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { CaslAbilityFactory } from './casl-ability.factory';
import { UserService } from 'server/user/user.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async ($configService: ConfigService) => ({
        secret: $configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '7200s'
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    DatabaseService,
    LocalStrategy,
    JwtStrategy,
    CaslAbilityFactory,
    UserService
  ],
  exports: [AuthService, CaslAbilityFactory]
})
export class AuthModule {}
