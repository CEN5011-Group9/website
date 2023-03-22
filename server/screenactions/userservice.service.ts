import { async } from "@angular/core/testing";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "server/database/database.service";
import { UserDTO } from "./userdto";

@Injectable()
export class UserService {
    constructor( private databaseService : DatabaseService ) { }

    async getUserDetails() : Promise<UserDTO> {
        let user = new UserDTO()
        user.firstName = 'UserFirstName';
        user.lastName = 'UserLastName';
        user.phoneNumber = '9876543210';
        user.mailID = 'usermailid@gmail.com'
        return user
    }

}