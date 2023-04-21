import { Component } from '@angular/core';
import { Club } from '../models/club';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-club-contacts',
  templateUrl: './club-contacts.component.html',
  styleUrls: ['./club-contacts.component.scss']
})
export class ClubContactsComponent {
  
  clubDetails : any

  addressDetails : any

  constructor( private router : ActivatedRoute,
    private route : Router ){ }

  ngOnInit(){
    this.router.params.subscribe( params=> {
      console.log("The club details parameter is " + params)
      console.log("The club details parameter in String format is " + JSON.stringify(params))

      this.clubDetails = params
      /*
      this.clubDetails = JSON.parse(params['clubDetails'])
      this.addressDetails = JSON.parse(params['addressDetails'])
      */
    })
  }

  navigateToUserProfile(){
    console.log("The code flow enters navigateToUserProfile() method in app.component.ts ")
    this.route.navigate(['/user-profile'])
  }

  logoutAndNavigateToLoginScreen(){
    console.log("The code flow enters logoutAndNavigateToLoginScreen() method in app.component.ts ")
    localStorage.removeItem('userDetails')
    localStorage.removeItem('loginCredentials')
    this.route.navigate(['/login'])
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
