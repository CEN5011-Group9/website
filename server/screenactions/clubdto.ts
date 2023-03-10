
export class ClubDTO {
    name: String;
    description: String;
    type: String;
    phone: String;
    email: String;
    address: {
        addressline1: String;
        street: String;
        city: String;
        state: String;
        zipcode: String;
    }

    constructor() {
        this.name = '';
        this.description = '';
        this.phone = '';
        this.type = '';
        this.email = '';
        this.address = {
            addressline1: '',
            street: '',
            city: '',
            state: '',
            zipcode: ''

        };
    }


};