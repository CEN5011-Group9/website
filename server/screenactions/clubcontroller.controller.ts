import { Controller, Get } from '@nestjs/common'
import { ClubDTO } from './clubdto'
import { ClubService } from './clubservice.service'

@Controller()
export class ClubController {

    constructor( private clubservice : ClubService ) { }
    
    @Get()
    getClubDetails() : ClubDTO {
        return this.clubservice.getClubDetails();
    }
}