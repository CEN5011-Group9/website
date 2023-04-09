import { createHash } from 'node:crypto';
import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { DatabaseService } from '../database/database.service';
import { User } from '@prisma/client';
import { AuthResponse } from './auth-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly $databaseService: DatabaseService,
    private readonly $jwtService: JwtService,
    private readonly $configService: ConfigService
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.$databaseService.user.findUnique({
      where: {
        email
      }
    });

    if (user) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  public async login(user: User): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      sub: user.id
    };

    return {
      accessToken: this.$jwtService.sign(payload)
    };
  }

  public async loginGraphQL(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    const user = await this.$databaseService.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new UnauthorizedException(
        'User could not be found in the database'
      );
    }

    const { passwordHash, ...request } = user;

    const isValidPassword = await argon2.verify(passwordHash, password);

    if (isValidPassword) {
      const payload = {
        email: request.email,
        sub: request.id
      };

      return {
        accessToken: this.$jwtService.sign(payload)
      };
    } else {
      throw new UnauthorizedException("User's password did not match");
    }
  }

  public async register(
    input: User,
    password: string
  ): Promise<any> {
    let check = await this.$databaseService.user.findMany({
      where: {
        OR: [
          {
            email: input.email
          }
        ]
      }
    });

    //Email and Display name are in use
    if (check?.length > 1) {
      throw new NotAcceptableException(
        'The email and display name you are trying to use are already registered'
      );
    }

    //Email is in use
    if (check[0]?.email === input.email) {
      throw new NotAcceptableException(
        'This email address is already registered'
      );
    }

    const passwordHash = await argon2.hash(password);

    const newUser = {
      ...input,
      passwordHash
    };

    let user = await this.$databaseService.user.create({
      data: newUser
    });

    const sha1 = createHash('sha1');

    const registrationCode = sha1
      .update(
        JSON.stringify({
          id: user.id,
          email: user.email
        })
      )
      .digest('hex');

    const payload = {
      email: user.email,
      sub: user.id
    };

    return {
      accessToken: this.$jwtService.sign(payload)
    };
  }

  public async verify(userId: string, code: string): Promise<boolean> {
    let user = await this.$databaseService.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new UnauthorizedException('User could not be found');
    } else {
      return true;
    }
  }
}
