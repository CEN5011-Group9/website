import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user'

@Component({
  selector: 'app-view-clubs',
  templateUrl: './view-clubs.component.html',
  styleUrls: ['./view-clubs.component.scss']
})
export class ViewClubsComponent {

  constructor(
    private readonly $http : HttpClient,
    private readonly $router : Router
  ) { }

  clubDetails : any

  clubApiPath : any

  currentUserDetailsString = localStorage.getItem('userDetails') as string

  currentUserDetails = JSON.parse(this.currentUserDetailsString)

  findClubApiPath( user : User ) : string {
    console.log("The flow entered findClubApiPath() in view-clubs.component.ts ")
    console.log("The user role is " + user.role)
    if( user.role == 'Admin' ){
      return 'http://localhost:4200/api/user/allClubs/' + user.email
    } else if( user.role == 'ClubOwner' ){
      return 'http://localhost:4200/api/user/clubs/' + user.email 
    }

    return ""
  }

  ngOnInit(){
    console.log("The flow entered the ngOnInit() in view-clubs.component.ts ")
    this.clubApiPath = this.findClubApiPath(this.currentUserDetails.user)

    console.log("The path is" + this.clubApiPath)
    this.$http.get(this.clubApiPath)
        .subscribe({
          next : ( clubData : any ) =>{
            this.clubDetails = clubData
          }, 
          error : ( err : any ) =>{
            console.log( "The error that occurred was " + err )
          }
        })
  }

  delete( club : any ){
    console.log("The flow entered deleted() in view-clubs.component.ts ")
    console.log("The club mail id is " + club.email)
    let deleteApiPath = 'http://localhost:4200/api/club/delete/' + club.email

    this.$http.delete(deleteApiPath)
      .subscribe({
        next : ( data: any ) => {
          console.log("The club that got deleted or the response message we received is " + JSON.stringify(data))
          this.clubDetails = this.clubDetails.filter((c: any) => c.email !== club.email);
        },
        error : ( err : any ) => {
          console.log("The error that occurred in delete() in view-clubs.component.ts class is " + err )
        }
      })
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

}
