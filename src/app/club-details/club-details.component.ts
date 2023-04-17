import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from '../models/club';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss']
})
export class ClubDetailsComponent {

  constructor( 
    private readonly router : ActivatedRoute,
    private readonly $http : HttpClient 
    ) { }

  clubDetails : any

  addressDetails : any

  clubAndAddressDetails : any

  mergedClubAndAddr : any

  findAddressApiPath( addressId : string ){
    return "http://localhost:4200/api/address/" + addressId
  }

  userTempDetailsString = localStorage.getItem('userDetails') as string

  userTempDetails : any = JSON.parse(this.userTempDetailsString)

  ngOnInit(){
    console.log("The code flow is entering ngOnInit() in club-details.component.ts "+ this.router.queryParams)
    //if( this.router.queryParams !== undefined )  //Doubt #1 - How to handle this
    console.log("The router parameter in string format is "+ JSON.stringify(this.router.params))
    this.router.params.subscribe(params => {
      this.clubDetails = params;
      console.log("The clubdetails object after initialization is " + JSON.stringify(this.clubDetails));

      let addressId = this.clubDetails.addressId

      if( addressId ){
        let addressApiPath = this.findAddressApiPath(addressId)

        this.$http.get(
          addressApiPath
        ).subscribe({
          next : ( data : any ) =>{
            console.log("The data that we received after successfully retrieving the address object is "+ data)
            this.addressDetails = data
          },
          error : ( err : any ) => {
            console.log("The error that has occurred in ngOnInit() in club-details.component.ts is " + err )
          } 
        })
      }
    });

    setTimeout( () => {
      this.processingClubAndAddress()
    } , 30000);
  
  }

  findJoinClubApiPath( userName : string, clubName : string ) : string {
    return "http://localhost:4200/api/club/join/" + userName + "/" + clubName
  }

  findRemoveClubApiPath( userName : string, clubName : string ) : string {
    return "http://localhost:4200/api/club/remove/" + userName + "/" + clubName
  }

  public join(){
    // let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
    // let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
    // if( leaveElement !== null )
    //   leaveElement.style.display = "block";
    // if( joinElement !== null )
    //   joinElement.style.display = "none";
    let joinClubApiPath = this.findJoinClubApiPath(this.userTempDetails.user.email, this.clubDetails.email)

    this.$http.put(
      joinClubApiPath,
      ""
    ).subscribe({
      next : (data:any) =>{
        console.log("The join() method in club-details.component.ts class is completed - the updated user details are" + JSON.stringify(data))
      },
      error : (err:any) =>{
        console.log("The error method in club-details.component.ts class is completed" + err)
      }
    })

  }

  public leave(){
    // let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
    // let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
    // if( leaveElement !== null )
    //   leaveElement.style.display = "none";
    // if( joinElement !== null )
    //   joinElement.style.display = "block";

    let removeClubApiPath = this.findRemoveClubApiPath(this.userTempDetails.user.email, this.clubDetails.email)

    this.$http.put(
      removeClubApiPath,
      ""
    ).subscribe({
      next : (data:any) =>{
        console.log("The join() method in club-details.component.ts class is completed - the updated user details are" + JSON.stringify(data))
      },
      error : (err:any) =>{
        console.log("The error method in club-details.component.ts class is completed" + err)
      }
    })

  }

  public processingClubAndAddress(){
    let cd = this.clubDetails
    let ad = this.addressDetails
    console.log("The clubDetails object in proprocessingClubAndAddress() is " + cd)
    console.log("The clubDetails in string format in proprocessingClubAndAddress() is " + JSON.stringify(cd) )
    console.log("The addressDetails object in proprocessingClubAndAddress() is " + ad)
    console.log("The addressDetails in string format in proprocessingClubAndAddress() is " + JSON.stringify(ad) )

    this.mergedClubAndAddr = { ...ad, ...cd}

    console.log("The merged club and address details object is " + this.mergedClubAndAddr )
    console.log("The merged club and address details string is " + JSON.stringify(this.mergedClubAndAddr) )

  }

}
