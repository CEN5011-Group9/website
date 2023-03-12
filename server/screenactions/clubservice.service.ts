import { Injectable } from "@nestjs/common";
import { DatabaseService } from "server/database/database.service";
import { ClubDTO } from "./clubdto";
import { Club } from "@prisma/client";

@Injectable()
export class ClubService{

    constructor( private databaseservice : DatabaseService ) { }

    async getClubDetails() : Promise<ClubDTO>{
        /* 
        //This is a code that attempts to get the club details from database using 
        //The id (primary key ) from the club table. 
        //The id or unique parameter will be sent as part of the parameter which we use to identify the object
        //This is currently disabled to send out hardcoded data but will be the flow in the future 
        let clubdetails = this.databaseservice.club.findUnique({
            where: {
                id
            }
        });
        */
        let clubdto = new ClubDTO();
        clubdto.name = "RandomGuysClub";
        clubdto.phone = "11111111111";
        clubdto.email = "randomguy@gmail.com";
        clubdto.description = "A place to get together and enjoy life";
        clubdto.address.addressline1 = "Apartment 8";
        clubdto.address.street = "12 North End Street";
        clubdto.address.city = "Miami";
        clubdto.address.state = "Florida";
        clubdto.address.zipcode = "99999";
        return clubdto;
    }
}