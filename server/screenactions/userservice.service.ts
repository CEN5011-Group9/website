import { async } from "@angular/core/testing";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "server/database/database.service";
import { UserDTO } from "./userdto";

@Injectable()
export class UserService {
    constructor( private databaseService : DatabaseService ) { }

    async getUserDetails(username : string) : Promise<any> {
        return await this.databaseService.user.findMany({ 
            where: {
                email : {
                    contains: username
                }
            }
        });
    }

    async getAllClubs( username: string ) : Promise<any> {
        const clubs = await this.databaseService.user.findMany({
            where: { email: username },
            include: { clubs: true }
        })
        return clubs
    }

    async getClub( username: string, clubname: string ): Promise<any> {
        const club = await this.databaseService.club.findUnique({
            where: { name: clubname }
        })

        return club
    }

    async getClubDetails( username: string, clubname: string  ): Promise<any> {
        const club = await this.databaseService.club.findUnique({
            where: { name: clubname }
        })

        return club
    }

    async getRole( username: string ) : Promise<any> {
        const user = await this.databaseService.user.findUnique({
            where: { email: username }
        });
        
        return user
    }

    async getAllUsers() : Promise<any> {
        const users = await this.databaseService.user.findMany({});

        return users
    }

}