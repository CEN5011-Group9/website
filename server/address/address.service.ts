import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { DatabaseService } from "server/database/database.service";
import { Address } from "@prisma/client";
import { ClubDetailDTO } from "server/models/ClubDetailDTO";


@Injectable()
export class AddressService{

    constructor(
        private readonly $databaseService : DatabaseService
    ) { }

    public async getAddress( id : string ) : Promise<Address | null>{
        console.log("The service call has entered getAddress() in AddressService class" )
        return await this.$databaseService.address.findUnique({
            where : { id : id }
        })
    }

    mapAddressData( address : Address, newClubDetailDTO : ClubDetailDTO ){
        console.log("The Address object is created from newClubDetailDTO")
        address.city = newClubDetailDTO.city
        address.state = newClubDetailDTO.state as string
        address.zipcode = newClubDetailDTO.zipcode as string
        address.street = newClubDetailDTO.street as string
        const uuId = this.generateUUID()
        console.log(uuId);
        address.id = uuId
    }

    public async updateAddress( request : any, id : string ) : Promise<Address | null>{
        console.log("The service call has entered updateAddress() in AddressService class" )
        return await this.$databaseService.address.update({
            where: { id: id },
            data: {
                street : request.street,
                city : request.city,
                state : request.state,
                zipcode : request.zipcode
            }
        })
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