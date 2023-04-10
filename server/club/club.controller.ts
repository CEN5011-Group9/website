import {
    Controller,
    Get,
    Query,
    Request,
    UseGuards,
    Param
  } from '@nestjs/common';
  import { Club, User, UserRole } from '@prisma/client';
  
  import { DatabaseService } from '../database/database.service';
  
  import { JwtAuthGuard } from '../auth/jwt-auth.guard'

  @Controller('club')
  export class ClubController{
    constructor( private readonly $database: DatabaseService ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:clubname')
    async getClub(
        @Param('clubname') clubname: string
    ) : Promise<Club | null> {
        return await this.$database.club.findUnique({
            where: {
                name: clubname
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/allClubs')
    async getAllClubs() : Promise<Club[] | null> {
        return await this.$database.club.findMany({});
    }

    @UseGuards(JwtAuthGuard)
    @Get('/allUsers/:clubName')
    async getAllUsers(
        @Param('clubname') clubname: string
    ) : Promise<User[] | undefined> {
        const club = await this.$database.club.findUnique({
            where: { name: clubname },
            include: { users: true }
        });

        return club?.users
    }

  }