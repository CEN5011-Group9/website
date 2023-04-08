import { Injectable } from "@nestjs/common";
import { DatabaseService } from "server/database/database.service";


@Injectable()
export class AddressService { 
    databaseService : DatabaseService

    constructor( databaseservice : DatabaseService ){
        this.databaseService = databaseservice
    }

    async getAddress( clubname : string ) : Promise<any> {
        const club = this.databaseService.club.findUnique({
            where: { name : clubname },
            include : { address : true }
        })

        return club.address
    }
}