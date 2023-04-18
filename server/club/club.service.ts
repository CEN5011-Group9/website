import { Injectable } from "@nestjs/common";
import { Address, Club } from "@prisma/client";
import { DatabaseService } from "server/database/database.service";
import { ClubDetailDTO } from "server/models/ClubDetailDTO";
import { UserService } from "server/user/user.service";



@Injectable()
export class ClubService{

    constructor(
        private databaseService : DatabaseService,
        private userService : UserService
    ) { }

    mapClubData( newClub : Club, newClubDetailDTO : ClubDetailDTO ){
        console.log("The Club object is created from newClubDetailDTO")
        newClub.name = newClubDetailDTO.name
        newClub.description = newClubDetailDTO.description
        newClub.email = newClubDetailDTO.email
        newClub.link = newClubDetailDTO.link
        newClub.phone = newClubDetailDTO.phone
        newClub.type = newClubDetailDTO.type
        newClub.addressId = newClubDetailDTO.addressId
        const uuId = this.generateUUID()
        console.log(" The club created has the UUID "+uuId);
        newClub.id = uuId
    }

    mapAddressData( newAddress : Address, newClubDetailDTO : ClubDetailDTO ){
        console.log("The Address object is created from newClubDetailDTO")
        newAddress.city = newClubDetailDTO.city
        newAddress.state = newClubDetailDTO.state as string
        newAddress.street = newClubDetailDTO.street as string
        newAddress.zipcode = newClubDetailDTO.zipcode as string
        const uuId = this.generateUUID()
        console.log(" The address created has the UUID " + uuId )
        newAddress.id = uuId
    }

    public generateUUID()  {
        let uuid = '';
        const characters = 'abcdef0123456789';
        for (let i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
              uuid += '-';
            } else {
              uuid += characters[Math.floor(Math.random() * 16)];
            }
          }
        return uuid;
    }

    
} 