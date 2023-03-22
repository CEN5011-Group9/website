import { ClubDTO } from "./clubdto";

export class UserDTO {
    firstName : String;
    lastName : String;
    mailID : String;
    phoneNumber : String;
    clubs : ClubDTO[];

    constructor() {
        this.firstName = '',
        this.lastName = '',
        this.mailID = '',
        this.phoneNumber = '',
        this.clubs = null as any
    }
}