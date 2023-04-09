import { Controller, Get, Query } from '@nestjs/common';
import { Club } from '@prisma/client';

import { DatabaseService } from '../database/database.service';

import { Public } from '../public.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly $database: DatabaseService) {}

  @Public()
  @Get('clubs')
  public async searchClub(
    @Query('name') name: string
  ): Promise<Club[]> {

    return await this.$database.club.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      include: {
        address: true
      }
    });
  }
}

