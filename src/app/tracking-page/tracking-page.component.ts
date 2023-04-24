import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Club } from '../models/club';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.scss']
})
export class TrackingPageComponent implements OnInit {

  userDetailsString = localStorage.getItem('userDetails') as string

  userTempDetails = JSON.parse(this.userDetailsString)

  public clubDetails : any

  public userDetails : any

  apiPath : any

  public findPath( user : User, direct : boolean ) : string{
    console.log("The user details string is " + this.userDetailsString)
    console.log("The user object in string form is "+ JSON.stringify(user))
    console.log("The user role is "+ user.role)
    console.log("The user role is "+ user.id)
    console.log("The user email is "+ user.email)

    if( user.role == 'Admin' && direct ){
      console.log("The user role has entered the admin flow")
      return '/api/user/allClubs/' + user.email
    } else if( user.role == 'User' ){
      console.log("The user role has entered the User flow")
      const path = '/api/user/clubs/' + user.email
      return path
    }

    return ""
  }
  

  public ngOnInit() : void {

    console.log("The code flow has entered ngOnInit() in tracking-page.component.ts")
    let direct = false

    console.log("The router parameters are "+ this.$router.params)

    console.log("The user temp details are"+ JSON.stringify(this.userTempDetails) )

    if( this.$router.params !== null && this.$router.params !== undefined ){
      console.log("The params is defined even when it is accessed from the homepage")
    }

    console.log("The user temp details breakdown is first name: " + this.userTempDetails.user.firstName 
    + " ,last name: " + this.userTempDetails.user.lastName 
    + " ,email: " + this.userTempDetails.user.email 
    + " ,role: " + this.userTempDetails.user.role )

    if( this.userTempDetails.user.role === 'Admin'  ){
      console.log("The ngOnInit() in tracking-page.component.ts has reached the admin flow")
      console.log("The router parameter in string format is "+ JSON.stringify(this.$router.params))
      this.$router.params.subscribe(
        params => {
            this.userDetails = params
        }
      )
    } else {
      console.log("The ngOnInit() in tracking-page.component.ts has reached the user flow")
      direct = true
      this.userDetails = this.userTempDetails.user
    }
    
    
    console.log("The direct flag is "+ direct)

    console.log("The user details are" + JSON.stringify(this.userDetails) )
    
    this.apiPath = this.findPath(this.userDetails, direct)

    console.log("The path in tracking page is "+this.apiPath)

    //this.totalHours = this.clubs.reduce((acc, club) => acc + club.hours, 0)

    this.$http.get(this.apiPath).subscribe({
      next: (data:any)=>{
        console.log("Got the following response" + data );
        this.clubDetails=data
      },
      error: (err:any)=>{
        console.log("The following error has occurred "+err);
      }
    })
    

  }

  totalHours: number = 0;

  constructor(
    private readonly $fb : FormBuilder,
    private readonly $http : HttpClient,
    private readonly $router : ActivatedRoute,
    private readonly $route : Router
    ) {}

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
  
    isStudent() : boolean {
      let user = JSON.parse(localStorage.getItem("userDetails") as string).user
      return user.role === "User"
    }

    navigateToWelcomePage(){
      console.log("The code flow enters navigateToWelcomePage() method in app.component.ts ")
      this.$route.navigate(['/welcome-page'])
    }

  
}
