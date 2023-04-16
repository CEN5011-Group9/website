import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { DatabaseService } from "server/database/database.service";
import { Public } from "server/public.decorator";
import { AddressService } from "./address.service";
import { Address } from "@prisma/client";


@Controller('address')
export class AddressController{

    constructor(
        private readonly $databaseService : DatabaseService,
        private readonly $addressService : AddressService
    ){}

    @Public()
    @Get('/:addressId')
    public async getAddress(
        @Param('addressId') addressId : string
    ) : Promise<Address | null>{
        console.log("The service call has entered getAddress() in AddressController")
        return this.$addressService.getAddress(addressId)
    }

}