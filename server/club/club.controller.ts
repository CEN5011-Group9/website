import {
    Controller,
    Get,
    Query,
    Request,
    UseGuards,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    Put
  } from '@nestjs/common';
  import { Club, User, UserRole, Address } from '@prisma/client';
  
  import { DatabaseService } from '../database/database.service';
  
  import { JwtAuthGuard } from '../auth/jwt-auth.guard'
  import { Public } from 'server/public.decorator';
import { ClubDetailDTO } from 'server/models/ClubDetailDTO';
import { ClubService } from 'server/club/club.service';
import { AddressService } from 'server/address/address.service';

  @Controller('club')
  export class ClubController{
    constructor( 
        private readonly $database: DatabaseService,
        private readonly clubservice : ClubService,
        private readonly addressService : AddressService 
    ) { }

    //@UseGuards(JwtAuthGuard)
    @Public()
    @Get('/:clubname')
    async getClub(
        @Param('clubname') clubname: string
    ) : Promise<Club[] | null> {
        return await this.$database.club.findMany({
            where: {
                name: clubname
            }
        });
    }

    @Public()
    @Get('/email/:email')
    async getClubByEmail(
        @Param('email') email: string
    ) : Promise<Club | null> {
        return await this.$database.club.findUnique({
            where: {
                email: email
            }
        });
    }

    //@UseGuards(JwtAuthGuard)
    @Public()
    @Get('/allClubs')
    public async getAllClubs(
        @Request() request: any
        ) : Promise<Club[] | null> {
        return await this.$database.club.findMany({});
    }

    //@UseGuards(JwtAuthGuard)
    @Public()
    @Get('/allUsers/:clubname')
    async getAllUsersForClub(
        @Param('clubname') clubname: string
    ) : Promise<User[] | undefined> {
        console.log("The code flow has entered getAllUsers() in the Club Controller class")

        const club = await this.$database.club.findUnique({
            where: { name: clubname },
            include: { users: true }
        });

        console.log("The response in getAllUsers() in Club Controller class is for club: "+ club?.name + " and mail id is " + club?.email)
        
        return club?.users
    }

    @Post('/create')
    public async createClub(
    @Body() newClubDTO : ClubDetailDTO
    ): Promise<Club> {

        console.log("The createClub() is initiated")

        console.log("The ClubDetailDTO is " + newClubDTO)

        //Generate a uuid for club and that is the id for it throughout
        // Send the id for club and create a new address with this id as the link
        //
        let newAddress : Address = {
            id : "",
            street : "",
            city : "",
            state : "",
            zipcode : ""
        }

        this.clubservice.mapAddressData(newAddress, newClubDTO)

        let createdAddress = await this.$database.address.create({data: newAddress})

        let newClub : Club = {
            id : "",
            email : "",
            type : "",
            description : "",
            link : "",
            phone : "",
            addressId : "",
            name : ""
        }

        this.clubservice.mapClubData(newClub, newClubDTO)

        newClub.addressId = createdAddress.id

        console.log("The createClub() is going to be created with the object"+ JSON.stringify(newClub) )

        return await this.$database.club.create({data: newClub})
    }

    @Public()
    @Get('/getAllUsers/:club')
    public async getAllUsersFromClub(
        @Param("club") clubname : string
    ) : Promise<User[] | null>{
        return await this.$database.user.findMany({})
    }

    @Patch('update/:email')
    public async updateClub (
        @Param('email') email : string,
        @Body() request : ClubDetailDTO
    ) : Promise<Club | null> {
        console.log("The control has entered the updateClub method in ClubController class ")
        const existingClub = await this.$database.club.findUnique({
            where: { email: email}
        })

        if( !existingClub ){
            return null
        }

        let updateClub : Club = {
            id : "",
            email : "",
            type : "",
            description : "",
            link : "",
            phone : "",
            addressId : "",
            name : ""
        }

        this.clubservice.mapClubData(updateClub, request)

        console.log("The club is found " + updateClub )

        console.log("The request details are: email - " + updateClub.email + " or this email " + updateClub.email )

        /*
        const clubObject : Partial<Club> = {}

        if( updateClub.name && updateClub.name !== existingClub.name ){
            clubObject.name = updateClub.name
        }

        if( updateClub.phone && updateClub.phone !== existingClub.phone ){
            clubObject.phone = updateClub.phone
        }

        if( updateClub.email && updateClub.email !== existingClub.email ){
            clubObject.email = updateClub.email
        }
        */

        let addressId : any 

        if( updateClub.addressId != null && updateClub.addressId != undefined && 
            updateClub.addressId != '' ){

            let addressOfClub : Address = {
                id : "",
                city : "",
                state : "",
                zipcode : "",
                street : ""
            }
            
            this.addressService.mapAddressData(addressOfClub, request)

            addressId = updateClub.addressId

            console.log("The address Id is " + addressId + " in ClubController class. ")

            this.addressService.updateAddress(addressOfClub, addressId);
        }
        

        const updatedClub= await this.$database.club.update({
            where: { email : email },
            data : //clubObject
            {
                email : request.email,
                name : request.name,
                phone : request.phone,
                type : request.type,
                description : request.description
            }//*/
        })
        
        console.log("The updated user details are " + updatedClub )
        return updatedClub

    }

    @Delete('/delete/:clubmailid')
    public async deleteClub(
        @Param('clubmailid') email : string
    ) {
        console.log("The delete call is initiated with the mail id " + email)

        const records = await this.$database.club.delete({
        where : { email : email }
        })
    }

    @Put('/join/:username/:clubname')
    public async join(
        @Param('username') username : string,
        @Param('clubname') clubname : string
    ){
        console.log("The join() is called in club.controller.ts class for the user " 
        + username + " and the club " + clubname)

        const user = await this.$database.user.findUnique({
            where : {
                email : username
            },
            include : {
                clubs : true 
            }
        })

        console.log("The current list of clubs for the users are")

        user?.clubs.forEach( (c) => {
            console.log(c.name +"->" + c.email)
        })

        const updatedUser = await this.$database.user.update({
            where: { email: username},
            data: { clubs : { connect: { email: clubname}}},
            include: { clubs: true}
        })

        console.log("The list of clubs after the update are")

        updatedUser?.clubs.forEach( (c) => {
            console.log(c.name +"->" + c.email)
        })

        return updatedUser

    }

    @Put('/remove/:username/:clubname')
    public async remove(
        @Param('username') username : string,
        @Param('clubname') clubname : string
    ){
        console.log("The remove() is called in club.controller.ts class for the user " 
        + username + " and the club " + clubname)

        const user = await this.$database.user.findUnique({
            where : {
                email : username
            },
            include : {
                clubs : true 
            }
        })

        console.log("The current list of clubs for the users are")

        user?.clubs.forEach( (c) => {
            console.log(c.name +"->" + c.email)
        })

        let updatedUser = await this.$database.user.update({
                where: { email: username},
                data: { clubs : { disconnect: { email: clubname}}},
                include: { clubs: true}
        })

        console.log("The list of clubs after the deleting the club are")

        updatedUser?.clubs.forEach( (c) => {
            console.log(c.name +"->" + c.email)
        })

        return updatedUser

    }

    @Put('/remove/:username')
    public async removeUserByClubRep(
        @Param('username') username : string,
        @Body('clubnames') clubnamesParam : string[]
    ){
        console.log("The remove() by the club rep to remvove an user from all his clubs" 
        + "The service is called in club.controller.ts class for the user " 
        + username )

        const user = await this.$database.user.findUnique({
            where : {
                email : username
            },
            include : {
                clubs : true 
            }
        })

        console.log("The current list of clubs for the users are")

        let clubNames : string[] = []

        user?.clubs.forEach( (c) => {
            console.log("Club found in the user object is " + c.name +"->" + c.email)
            clubnamesParam.forEach( (cp) => {
                if( c.email === cp ){
                    console.log("The club is also found in the request."
                    + "The user's association for this club will be attempted to be removed")
                    clubNames.push(cp)
                }
            })
        })

        let updatedUser : any

        try {
            for( let clubname of clubNames ){
                updatedUser = await this.$database.user.update({
                    where: { email: username},
                    data: { clubs : { disconnect: { email: clubname}}},
                    include: { clubs: true}
                })
            }
        } catch( err : any ){
            console.log("Faced an error when disconnecting the club:" + err)
        }
        

        console.log("The list of clubs after the deleting the club are")

        if( updatedUser !== null && updatedUser !== undefined){
            updatedUser?.clubs.forEach( (c : Club) => {
                console.log(c.name +"->" + c.email)
            })
        }
        

        return updatedUser

    }


  }