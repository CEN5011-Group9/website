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
    private readonly $http : HttpClient,
    private readonly $route : Router 
    ) { }

  clubDetails : any

  addressDetails : any

  clubAndAddressDetails : any

  mergedClubAndAddr : any

  findAddressApiPath( addressId : string ){
    return "/api/address/" + addressId
  }

  userTempDetailsString = localStorage.getItem('userDetails') as string

  userTempDetails : any = JSON.parse(this.userTempDetailsString)

  isUserJoined : any

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

    console.log("The list of clubs for the current user is" + JSON.stringify(this.userTempDetails.user.clubs) )

    const clubs : Club[] = this.userTempDetails.user.clubs
    
    this.isUserJoined = false
     
    for( let club of clubs ){
      console.log("The name of the clubs in user object is " + club.email 
      + " and the current club is " + this.clubDetails.email 
      + " and are they same " + (club.email === this.clubDetails.email) )
      if( club.email === this.clubDetails.email ){
        this.isUserJoined = true
      }
    }

    console.log("Is the user already a member of the club" + this.isUserJoined)

    setTimeout( () => {
      this.processingClubAndAddress()
    } , 1000);
  
  }

  findJoinClubApiPath( userName : string, clubName : string ) : string {
    return "/api/club/join/" + userName + "/" + clubName
  }

  findRemoveClubApiPath( userName : string, clubName : string ) : string {
    return "/api/club/remove/" + userName + "/" + clubName
  }

  public join(){
    /*
      let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
      let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
      if( leaveElement !== null )
        leaveElement.style.display = "block";
      if( joinElement !== null )
        joinElement.style.display = "none";
    */
    this.isUserJoined = true

    /*
    let club : any

     this.$http.get("/api/club/email" + this.clubDetails.email)
                    .subscribe({
                      next : (data:any) => {
                        club = data
                      }, error : (err:any) => {
                        console.log("The error is" +)
                      }
                    })

    console.log("The club details you joined is" + club)

    this.userTempDetails.user.clubs.push(JSON.stringify(club.source))

    let userDetailsString = JSON.stringify(this.userTempDetails)

    localStorage.setItem("userDetails", userDetailsString)
    */
    
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
    /*
      let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
      let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
      if( leaveElement !== null )
        leaveElement.style.display = "none";
      if( joinElement !== null )
        joinElement.style.display = "block";
    */
    this.isUserJoined = false

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

  public isStudent(){
    return this.userTempDetails.user.role === "User"
  }

  navigateToUserProfile(){
    console.log("The code flow enters navigateToUserProfile() method in app.component.ts ")
    this.$route.navigate(['/user-profile'])
  }

  logoutAndNavigateToLoginScreen(){
    console.log("The code flow enters logoutAndNavigateToLoginScreen() method in app.component.ts ")
    localStorage.removeItem('userDetails')
    localStorage.removeItem('loginCredentials')
    this.$route.navigate(['/login'])
  }

  isAdminOrClubRep() : boolean {
    let user = JSON.parse(localStorage.getItem("userDetails") as string).user
    return user.role === "Admin" || user.role === "ClubOwner"
  }

  isAdminOrStudent() : boolean {
    let user = JSON.parse(localStorage.getItem("userDetails") as string).user
    return user.role === "Admin" || user.role === "User"
  }


}
