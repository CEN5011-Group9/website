import { Controller, Get, Param } from "@nestjs/common"; 
import { Public } from "server/public.decorator";
import { AddressService } from "./addressservice.service";

@Controller()
export class AddressController{ 

    constructor( private readonly addressService : AddressService ) { }

    @Public()
    @Get('address/:clubname')
    getAddress( @Param('clubname') clubname : string ) : Promise<any> {
        return this.addressService.getAddress(clubname);
    }

}
