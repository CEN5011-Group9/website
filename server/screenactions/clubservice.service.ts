import { Injectable } from "@nestjs/common";
import { ClubDTO } from "./clubdto";

@Injectable()
export class ClubService{

    getClubDetails() : ClubDTO{
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