import { Controller, Get, Query } from '@nestjs/common';
import { Club } from '@prisma/client';

import { DatabaseService } from '../database/database.service';

import { Public } from '../public.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly $database: DatabaseService) {}

  @Public()
  @Get('club')
  public async searchClub(
    @Query('name') clubName: string,
    @Query('type') clubType: string,
    @Query('city') city: string,
    @Query('state') state: string,
    @Query('zipcode') zipcode: string
  ): Promise<Club[]> {
    const where : { [key: string]: any} = {
      where: {
        name: {
          contains: clubName
        }, 
        type: {
          contains: clubType
        },
        city: {
          contains: city
        },
        state: {
          contains: state
        },
        zipcode: {
          contains: zipcode
        }
      }
    };

    Object.keys(where).forEach(key=>{
      if( !where[key]){
        delete where[key];
      }
    })

    return await this.$database.club.findMany({
      where: where
    });
  }
}

