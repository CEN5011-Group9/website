import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { Club, User, UserRole } from '@prisma/client';

import { DatabaseService } from '../database/database.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Public } from 'server/public.decorator';
import { Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetailDTO } from 'server/models/UserDetailDTO';
import { isRFC3339 } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(
    private readonly $database: DatabaseService,
    private readonly userService : UserService
    ) {}

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Get('/:username')
  public async getUser(
    @Param('username') email: string
  ): Promise<User | null> {
    return await this.$database.user.findUnique({
      where: {
        email: email
      },
      include: {
        clubs: true
      }
    });
  }

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Get('/allUsers')
  public async getAllUsers(
    @Request() request: any
  ): Promise<User[] | null> {
    console.log("The control has entered into getAllUsers() in user.controller.ts ")
    return await this.$database.user.findMany({
      include : { clubs : true}
    });
  }

  @Public()
  @Get('/getAllUsers/:club')
  public async getAllUsersFromClub(
      @Param("club") clubname : string
  ) : Promise<User[] | null>{
      return await this.$database.user.findMany({})
  }

  @Public()
  @Get('/allClubs/:clubname')
  public async getAllClubsFromClubName(
    @Param("clubname") clubname : string
    ) : Promise<Club[] | null> {
      console.log("The control has entered into getAllClubs() in user.controller.ts ")
      return await this.$database.club.findMany({});
      //console.log("The data is "+ clubs)
      //return clubs;
  }

  @Public()
  @Get('/allClubs/:username')
  public async getAllClubs( @Param('username') username : string ) : Promise<Club[] | null> {
      console.log("The control has entered into getAllClubs() in user.controller.ts ")
      return await this.$database.club.findMany({});
  }

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Get('/role/:username')
  public async getRole( @Param('username') username : string ): Promise<UserRole | undefined> {
    const user = await this.$database.user.findUnique({
      where: { email: username }
    });

    return user?.role
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/clubs/:username')
  public async getClubs( @Param('username') username : string ): Promise<Club[] | undefined> {
    const user = await this.$database.user.findUnique({
      where: { email: username },
      include: { clubs: true }
    });

    return user?.clubs
  }

  
  @Post('/create')
  public async createUser(
    @Body() newUserDTO : UserDetailDTO
  ): Promise<User> {

    return this.userService.createUser(newUserDTO)
    
  }

  @Patch('/update/:username')
  public async updateUser (
    @Param('username') username : string,
    @Request() request : any
  ) : Promise<User | null> {
    console.log("The control has entered the updateUser method ")
    const user = await this.$database.user.findUnique({
      where: { email: username}
    })

    if( !user ){
      return null
    }

    console.log("The user is found " + user )

    console.log("The request details are: email - " + request.body.email + " or this email " + request.email )

    const updatedUser = await this.$database.user.update({
      where: { email : username },
      data : {
        email : request.body.email,
        passwordHash : request.body.passwordHash,
        firstName : request.body.firstName,
        lastName : request.body.lastName,
        phoneNumber : request.body.phoneNumber
      }
    })
    
    console.log("The updated user details are " + updatedUser )
    return updatedUser

  }

  @Delete('/delete/:username')
  public async deleteUser(
    @Param('username') username : string
  ) {
    console.log("The delete call is initiated with the mail id " + username)

    const records = await this.$database.user.delete({
      where : { email : username }
    })
  }
  

}

