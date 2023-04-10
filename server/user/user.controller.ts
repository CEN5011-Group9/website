import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { Club, User, UserRole } from '@prisma/client';

import { DatabaseService } from '../database/database.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly $database: DatabaseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUser(
    @Request() request: any
  ): Promise<User | null> {
    return await this.$database.user.findUnique({
      where: {
        id: request.user.id,
        email: request.user.email
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allUsers')
  public async getAllUsers(
    @Request() request: any
  ): Promise<User[] | null> {
    return await this.$database.user.findMany({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('/role')
  public async getRole(
    @Request() request: any
  ): Promise<UserRole | undefined> {
    const user = await this.$database.user.findUnique({
      where: { email: request.user.email }
    });

    return user?.role
  }

  @UseGuards(JwtAuthGuard)
  @Get('/clubs')
  public async getClubs(
    @Request() request: any
  ): Promise<Club[] | undefined> {
    const user = await this.$database.user.findUnique({
      where: { email: request.user.email },
      include: { clubs: true }
    });

    return user?.clubs
  }
}

