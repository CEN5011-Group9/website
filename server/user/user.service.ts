import { Injectable } from "@nestjs/common";
import { User, UserRole } from "@prisma/client";
import { DatabaseService } from "server/database/database.service";
import { UserDetailDTO } from "server/models/UserDetailDTO"


@Injectable()
export class UserService {

    public constructor(
        private readonly $databaseService : DatabaseService
    ) { }

    mapUserData( user : User, userDTO : UserDetailDTO ) : void {
        user.email = userDTO.email
        user.firstName = userDTO.firstName
        user.lastName = userDTO.lastName
        user.phoneNumber = userDTO.phoneNumber
        user.passwordHash = userDTO.password
        user.role = userDTO.isClubRep ? UserRole.ClubOwner : UserRole.User
        user.id = this.generateUUID()
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

    public async createUser( newUserDTO : UserDetailDTO ) : Promise<User>{
      console.log("The createUser() is initiated")

      console.log("The UserDetailDTO is " + newUserDTO)

      let newUser : User = {
        id : "",
        email : "",
        passwordHash : "",
        role : UserRole.User,
        firstName : "",
        lastName : "",
        phoneNumber : ""
      }

      this.mapUserData(newUser, newUserDTO)

      console.log("The createUser() is going to be created")

      return await this.$databaseService.user.create({data: newUser})
    }

}