import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'website';

  //isStudent = this.isStudentOrAdmin()
  //isClubRep = this.isClubRepOrAdmin()

  constructor(
    public readonly $userService: UserService,
    public readonly $router : Router
  ) {}

  /*
  isStudentOrAdmin() : boolean {
    let role = ""
    
    console.log("Entered isStudentOrAdmin()")

    if( typeof window !== 'undefined' ){
      console.log("Entered conditional flow")
      let userDetailsString = localStorage.getItem("userDetails") as string
      let userDetails = JSON.parse(userDetailsString)
      role = userDetails.userType
    }

    console.log("Entered isStudentOrAdmin() and role is " + role )
    if( role === "" ) return true
    
    console.log("Crossed the true parameter")

    return role == "Admin" || role == "User"
  }

  isClubRepOrAdmin() : boolean {
    let role = ""
    
    console.log("Entered isStudentOrAdmin()")

    if( typeof window !== 'undefined' ){
      console.log("Entered conditional flow")
      let userDetailsString = localStorage.getItem("userDetails") as string
      let userDetails = JSON.parse(userDetailsString)
      role = userDetails.userType
    }

    console.log("Entered isStudentOrAdmin() and role is " + role )
    
    if( role === "" ) return true

    console.log("Crossed the true parameter")

    return role == "Admin" || role == "ClubRep"
  }
  */

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

  
  
  

}
