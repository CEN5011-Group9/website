export class UserDetailDTO {
	email : string;
	password : string;
	isClubRep : boolean;
	firstName : string;
	lastName : string;
	phoneNumber : string;

    constructor(){
		this.email = "",
		this.firstName = "",
		this.isClubRep = false,
		this.lastName = "",
		this.password = "admin",
		this.phoneNumber = "98765"
	}
    
}