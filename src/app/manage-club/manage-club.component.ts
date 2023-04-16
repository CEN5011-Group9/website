import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from '../models/club';
import { User } from '../models/user';

@Component({
  selector: 'app-manage-club',
  templateUrl: './manage-club.component.html',
  styleUrls: ['./manage-club.component.scss']
})
export class ManageClubComponent {

  public clubDetails : any
  public addressDetails : any

  userDetailsString = localStorage.getItem('userDetails') as string

  userTempDetails = JSON.parse(this.userDetailsString)

  public userDetails : any

  apiPath = this.findClubPath(this.userTempDetails.user, this.userDetailsString)

  addressApiPath : any

  updateClubPath : any

  public findClubPath( user : User, userString : string ) : string{
    console.log(" The user details string is " + userString)
    console.log("The user details are " + user + " and the details are " + user.firstName +" and the last name is " + user.lastName + " ,the type is " + user.role )
    if( user.role === 'Admin' ){
      return 'http://localhost:4200/api/user/allClubs/'
    } else if( user.role === 'ClubOwner' ){
      const path = 'http://localhost:4200/api/user/clubs/' + user.email
      return path
    }

    return ""
  }

  public findAddressPath( addressId : string ){
    console.log("The addressid is " + addressId)
    return 'http://localhost:4200/api/address/' + addressId
  }

  ngOnInit(){

    console.log("We have entered ngOnInit() in ManageClubComponent ")

    this.$route.params.subscribe( params => {
      console.log(params) 
      this.clubDetails = params;
    });

    

    this.$route.params.subscribe( params => {
      this.manageClubForm.patchValue({ // Use patchValue to set the initial value of addressId
        addressId: params['addressId']
      });
    });

    console.log(this.clubDetails)

    /*
    this.$route.params.subscribe( params => {
      this.manageClubForm.patchValue({ // Use patchValue to set the initial value of addressId
        id: params['id']
      });
    });
    */


    if( this.clubDetails !== null || this.clubDetails !== undefined ){
      console.log("The service call is about to be started for address service call")

      this.getAddressDetails(this.clubDetails.addressId)
    }

    /*
    console.log("The path in ngOnInit() in ManageClubComponent is "+this.apiPath)
    this.$http.get(this.apiPath).subscribe({
      next: (clubData:any)=>{
        console.log("Got the following response in ngOnInit() in ManageClubComponent" + clubData );
        this.clubDetails = clubData[0] 
      },
      error: (err:any)=>{
        console.log("The following error has occurred in ngOnInit() in ManageClubComponent "+err);
      }
    })

    if( this.clubDetails !== null || this.clubDetails !== undefined ){
      console.log("The service call happens for address service call")
      this.$http.get(this.addressApiPath)
          .subscribe({
            next : (addressData:any) =>{
              console.log("The address data is "+ addressData)
              this.storeAddressDetails(addressData)
            },
            error : (err : any) => {
              console.log("The error in address get service call is " + err)
            }
          })
    }
    */
  }

  public storeAddressDetails( addressData : any ){
    console.log("The address data is "+ addressData + " and the content is " 
    + addressData.street +", " + addressData.city + ", " + addressData.state 
    + ", " + addressData.zipcode)
    this.addressDetails = addressData
    console.log(this.addressDetails)
  } 

  public manageClubForm = this.$fb.group({
    name : [""],
    type: [""],
    description: [""],
    phone: [""],
    email: [""],
    street : [''],
    city : [""],
    state : [""],
    zipcode: [""],
    addressId: [""]
  });

  public getAddressDetails( path : string ){
    this.addressApiPath = this.findAddressPath(this.clubDetails.addressId)

    this.$http.get(this.addressApiPath)
        .subscribe({
          next : (addressData:any) =>{
            console.log("The address data is "+ addressData)
            this.storeAddressDetails(addressData)
          },
          error : (err : any) => {
            console.log("The error in address get service call is " + err)
          }
        })
  }

  constructor(
    private readonly $router: Router,
    private readonly $http: HttpClient,
    private readonly $fb: FormBuilder,
    private readonly $route: ActivatedRoute
  ) {}

  updateCall(){

    console.log("The updateCall() in manage-club.component.ts file is going to be attempted")

    this.updateClubPath = "http://localhost:4200/api/club/update/" + this.clubDetails.email

    console.log("The path is " + this.updateClubPath)

    console.log("The request payload is "+ this.manageClubForm.value)

    this.$http.patch(
      this.updateClubPath,
      this.manageClubForm.value
    ).subscribe({
      next : ( data : any ) => {
        console.log("The update call is completed for the club and" +
        "possibly the address fields in updateCall() in manage-club.component.ts file")
        console.log("The updated data is "+ data)
        this.getAddressDetails(this.clubDetails.addressId)
        this.clubDetails = data
      },
      error : ( err : any) => {
        console.log("This is the error that has occurred"+ err)
      }
    })
  }
}
