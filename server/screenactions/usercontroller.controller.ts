import { Controller, Get } from "@nestjs/common";
import { UserDTO } from "./userdto";
import { UserService } from "./userservice.service";
import { Request } from "@nestjs/common";
import { Public } from "server/public.decorator";
import { Param } from "@nestjs/common/decorators";
import { Query } from "@nestjs/common/decorators";

@Controller()
export class UserController {
    constructor( private $userservice : UserService ) { }

    @Public()
    @Get('user/:username')
    async getUserDetails(@Param('username') username: string) : Promise<UserDTO> {
        return this.$userservice.getUserDetails(username);
    }

    @Public()
    @Get('user/clubs/:username')
    async getAllClubs(@Param('username') username: string) : Promise<any>{
        return this.$userservice.getAllClubs(username);
    }

    @Public()
    @Get('user/club/')
    async getClub(
        @Query('username') username: string,
        @Query('clubname') clubname: string
        ) : Promise<any> {
        return this.$userservice.getClub( username, clubname);
    }

    @Public()
    @Get('user/club/')
    async getClubDetails(
        @Query('username') username: string,
        @Query('clubname') clubname: string 
        ) : Promise<any> {
        return this.$userservice.getClubDetails( username, clubname);
    }

    @Public()
    @Get('user/role/:username')
    async getRole(@Param('username') username: string ) : Promise<any> {
        return this.$userservice.getRole(username);
    }

    
}