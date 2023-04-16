import { AddressDTO } from 'server/models/AddressDTO'

export class ClubDetailDTO {
    id : string;
    name : string;
    link : string;
    phone : string;
    email : string;
    description : string;
    type : string;
    addressId : string;
    city: string;
    state: String;
    street: String;
    zipcode: String;

    constructor(){
        this.id = "",
        this.name = "",
        this.link = "",
        this.phone = "",
        this.email = "",
        this.description = "",
        this.type = "",
        this.addressId = "",
        this.city = "",
        this.state = "",
        this.street = "",
        this.zipcode = ""
    }
}