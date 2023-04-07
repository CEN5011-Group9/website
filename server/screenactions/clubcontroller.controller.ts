import { Controller, Get } from '@nestjs/common'
import { ClubDTO } from './clubdto'
import { ClubService } from './clubservice.service'
import { Request } from '@nestjs/common';
import { Public } from 'server/public.decorator';
import { Param, Query } from '@nestjs/common/decorators';

@Controller()
export class ClubController {

    constructor( private $clubservice : ClubService ) { }
    
    @Public()
    @Get('club/:clubname')
    async getClubDetails(@Param('clubname') clubname: string) : Promise<ClubDTO> {
        return this.$clubservice.getClubDetails(clubname);
    }

    @Public()
    @Get('/club/user')
    async getUser( 
        @Query('username') username: string,
        @Query('clubname') clubname: string
     ) : Promise<any> {
        return this.$clubservice.getUser(clubname, username);
    }

    @Public()
    @Get('/club/users/:clubname')
    async getAllUsers(@Param('clubname') clubname : string ) : Promise<any> {
        return this.$clubservice.getAllUsers(clubname);
    }

    @Public()
    @Get('/club/allclubs/')
    async getAllClubs(@Request() request : any ) : Promise<any> {
        return this.$clubservice.getAllClubs();
    }

    @Public()
    @Get('/club/address/:clubname')
    async getAddress(@Param('clubname') clubname : string ) : Promise<any> {
        return this.$clubservice.getAddress(clubname);
    }
}