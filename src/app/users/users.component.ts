import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { style } from '@angular/animations';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../models/club'

@Component({
  selector: 'app-view-users-page',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  userDetailsString = localStorage.getItem('userDetails') as string

  userTempDetails = JSON.parse(this.userDetailsString)

  public userDetails : any

  public allClubs : any

  apiPath = this.findPath(this.userTempDetails.user, this.userDetailsString)

  public findPath( user : User, userString : string ) : string{
    console.log(" The user details string is " + userString)
    console.log("The user details are " + user + " and the details are " + user.firstName +" and the last name is " + user.lastName + " ,the type is " + user.role )
    if( user.role === 'Admin' ){
      return '/api/user/getAllUsers/' + user.email
    } else if( user.role === 'ClubOwner' ){
      const path = '/api/club/allUsers/' + 'Math%20Club'
      return path
    }

    return ""
  }
  
  ngOnInit(){
    console.log("The path is "+this.apiPath)
    this.$http.get(this.apiPath).subscribe({
      next: (userData:any)=>{
        console.log("Got the following response" + userData );
        this.storeUserDetails(userData) },
      error: (err:any)=>{
        console.log("The following error has occurred "+err);
      }
    })

    if( this.userTempDetails.user.role == 'Admin' ){
      let getAllClubsApiPath = "/api/user/allClubs/" + this.userTempDetails.user.email
      let data : any
      try {
        data = this.$http.get(getAllClubsApiPath).toPromise()
        this.allClubs = data
      } catch( exception : any ){
        console.log("The following exception occurred" + exception )
      }
    }
  }

  storeUserDetails( userData : any ){
    console.log(userData)
    this.userDetails = userData
  }

  constructor(
    private readonly $http: HttpClient,
    private readonly $router: Router,
    private readonly $route: ActivatedRoute
  ) {}

  public viewTracking(){

  }

  public delete( user : any ){
    console.log("The code flow has entered delete() in users.component.ts file ")
    console.log("The mail id of the user is "+ user.email)
    let deleteApiPath = "/api/user/delete/" + user.email
    console.log("The delete path is " + deleteApiPath)
    this.$http.delete(deleteApiPath)
      .subscribe({
        next : (data : any ) => {
          console.log("The data in delete() in users.component.ts file is " + data)
          this.userDetails = this.userDetails.filter( (u : any) =>{ u.email !== user.email})
        },
        error : ( err : any ) => {
          console.log("The error in delete() in users.component.ts file is " + err)
        }
      })

  }

  public removeUser( user: any ){
    console.log("The code flow has entered removeUser() in users.component.ts file ")
    console.log("The mail id of the user is "+ user.email)

    let removeApiPath = "/api/club/remove/" + user.email

    let clubNames : string[] = []

    let currentUser = this.userTempDetails.user

    if( currentUser.role === 'ClubOwner' ){
      this.userTempDetails.user.clubs.forEach( (club:any) => {
        clubNames.push(club.email)
      })
    } else if( currentUser.role === 'Admin' ){
      
      console.log("The control reached after the all clubs point")
      console.log("The all clubs are " + JSON.stringify(this.allClubs) )

      this.allClubs.__zone_symbol__value.forEach( (club:any) => {
        console.log("The club is " + club.name + " and email id is " + club.email)
        clubNames.push(club.email)
      })
    }
    

    let clubNamesRequest = { "clubnames" : clubNames }

    console.log("The clubNames that will removed from an user is "+ clubNames)

    this.$http.put(
      removeApiPath,
      clubNamesRequest
    ).subscribe({
      next : (data : any) => {
        console.log("The data in removeUser() in users.component.ts file is " + data)
      },
      error : (err : any) => {
        console.log("The error in removeUser() in users.component.ts file is " + err)
      }
    })
    

  }

  public isAdmin() : boolean {
    return JSON.parse(localStorage.getItem("userDetails") as string).user.role == "Admin"
  }

  navigateToUserProfile(){
    console.log("The code flow enters navigateToUserProfile() method in app.component.ts ")
    this.$router.navigate(['/user-profile'])
  }

  logoutAndNavigateToLoginScreen(){
    console.log("The code flow enters logoutAndNavigateToLoginScreen() method in app.component.ts ")
    localStorage.removeItem('userDetails')
    localStorage.removeItem('loginCredentials')
    this.$router.navigate(['/login'])
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

  /*
  public async getAllClubs() : Promise<Club[]>{
    let getAllClubsApiPath = "/api/user/allClubs/" + this.userTempDetails.user.email
    let data : any
    try {
      data = await this.$http.get(getAllClubsApiPath).toPromise()
    } catch( exception : any ){
      console.log("The following exception occurred" + exception )
    }

    return data
  }
  */
}
