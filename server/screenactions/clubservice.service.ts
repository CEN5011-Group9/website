import { Injectable } from "@nestjs/common";
import { DatabaseService } from "server/database/database.service";
import { ClubDTO } from "./clubdto";
import { Address, Club } from "@prisma/client";
import { Query } from "@nestjs/common/decorators";
import { UserService } from "./userservice.service";

@Injectable()
export class ClubService{

    constructor( private databaseservice : DatabaseService ) { }

    async getClubDetails( clubname : string ) : Promise<any>{
        const clubs = this.databaseservice.club.findMany({
            where: { name: clubname},
            include: { address: true }
        })

        return clubs
    }

    async getUser( clubname: string, username : string ) : Promise<any> {
        const user = await this.databaseservice.user.findMany({
            where : { clubs: { some: { name: clubname  } } , email: username},
            include : { clubs: true }
        });

        return user;
    }

    async getAllUsers( clubname: string ) : Promise<any> {
        const allUsers = await this.databaseservice.user.findMany({
            where : { clubs: { some : { name: clubname } } },
            include : { clubs : true }
        });

        return allUsers;
    }

    async getAddress( clubname: string ) : Promise<any> {
        const club = this.databaseservice.club.findUnique({
            where: { name: clubname },
            include: { address: true }
        });

        return club.address
    }

    async getAllClubs() : Promise<any> {
        const allClubs = this.databaseservice.club.findMany({
            include: { 
                address: true
            }
        });

        return allClubs
    }


}