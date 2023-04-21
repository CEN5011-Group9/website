import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(
    private readonly $router : Router
  ) {}

  
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
