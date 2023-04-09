import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { User } from '@prisma/client';

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
}

