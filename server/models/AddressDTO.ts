
export class AddressDTO {
    id : string;
    street : string;
    city : string;
    state : string;
    zipcode : string;

    constructor(){
        this.id = "",
        this.street = "",
        this.city = "",
        this.state = "",
        this.zipcode = ""
    }
}