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
import { UserService } from 'server/user/user.service';
import { UserDetailDTO } from 'server/models/UserDetailDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly $databaseService: DatabaseService,
    private readonly $jwtService: JwtService,
    private readonly $configService: ConfigService,
    private readonly $userService: UserService
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

  public async login(user: UserDetailDTO): Promise<User | null> {

    //console.log("The details of the user are " + JSON.stringify(user))
    console.log("The user details are " + user.email + " " + user.password)

    const userDetail = await this.$databaseService.user.findUnique({
      where: {
        email : user.email
      },
      include: {
        clubs: true
      }
    });

    if (!userDetail) {
      throw new UnauthorizedException(
        'User could not be found in the database'
      );
    }

    if ( userDetail.passwordHash === user.password ) {
      return userDetail
    } else {
      console.log("The password at the Database " + userDetail.passwordHash  + " and the password at the request is " + user.password)
      throw new UnauthorizedException("User's password did not match");
    }

    return userDetail
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
    input: UserDetailDTO
  ): Promise<User | null> {

    //let userString = JSON.stringify(input)
    console.log("The input parameter(User data from front-end) is " + input)
    console.log("The email in the request is " + input.email)

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
    console.log("The email in the DB is " + check[0]?.email)
    console.log("The email in the request is " + input.email)

    if (check[0]?.email === input.email) {
      throw new NotAcceptableException(
        'This email address is already registered'
      );
    }

    //const passwordHash = await argon2.hash(password);

    return this.$userService.createUser(input)

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
