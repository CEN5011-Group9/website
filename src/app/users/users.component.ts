import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { style } from '@angular/animations';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-users-page',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  userDetailsString = localStorage.getItem('userDetails') as string

  userTempDetails = JSON.parse(this.userDetailsString)

  public userDetails : any

  apiPath = this.findPath(this.userTempDetails.user, this.userDetailsString)

  public findPath( user : User, userString : string ) : string{
    console.log(" The user details string is " + userString)
    console.log("The user details are " + user + " and the details are " + user.firstName +" and the last name is " + user.lastName + " ,the type is " + user.role )
    if( user.role === 'Admin' ){
      return 'http://localhost:4200/api/user/getAllUsers/' + user.email
    } else if( user.role === 'ClubOwner' ){
      const path = 'http://localhost:4200/api/club/allUsers/' + 'Math%20Club'
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
    let deleteApiPath = "http://localhost:4200/api/user/delete/" + user.email
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
}
