import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@prisma/client';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  updateUserApiPath : any
  userDetails : any

  constructor(
    private readonly $http : HttpClient,
    private readonly $fb : FormBuilder,
    private readonly $router : ActivatedRoute,
    private readonly $route : Router
  ){}

  public updateClubApiForm = this.$fb.group({
    email: [""],
    role: [""],
    firstName: [""],
    lastName: [""],
    phoneNumber: [""]
  })

  findUpdateUserApiPath( email : string ){
    return "/api/user/update/" + email
  }

  ngOnInit(){
    console.log("The code flow has entered ngOnInit() in update-user.component.ts")
    
    this.$router.params.subscribe(
      params => {
        this.userDetails = params
      }
    )

    this.$router.params.subscribe(
      params => {
        this.updateClubApiForm.patchValue({
          role: params['role']
        }) 
      }
    )
  }

  public updateUser(){
    let user = this.userDetails
    console.log("The code flow has entered update() in update-user.component.ts file ")
    console.log("The mail id of the user is "+ user.email)

    let updateApiPath = this.findUpdateUserApiPath(user.email)
    console.log("The update api path is " + updateApiPath)

    this.$http.patch(
      updateApiPath,
      this.updateClubApiForm.value
      )
      .subscribe({
        next: (data:any) => {
          console.log("The data updated in update() or the response received after update call in users.component.ts file is " + data)
          this.userDetails = data
        },
        error: (err:any) => {
          console.log("The error that we have received in update() in users.component.ts is " + err)
        }
      })
    
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

  isStudent() : boolean {
    let user = JSON.parse(localStorage.getItem("userDetails") as string).user
    return user.role === "User"
  }

  navigateToWelcomePage(){
    console.log("The code flow enters navigateToWelcomePage() method in app.component.ts ")
    this.$route.navigate(['/welcome-page'])
  }
}
