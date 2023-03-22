import { Controller, Get } from "@nestjs/common";
import { UserDTO } from "./userdto";
import { UserService } from "./userservice.service";

@Controller()
export class UserController {
    constructor( private userservice : UserService ) { }

    @Get()
    async getUserDetails() : Promise<UserDTO> {
        return this.userservice.getUserDetails();
    }
    
}