import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  updateUserApiPath : any
  userDetails : any

  findUpdateUserApiPath( email : string ){
    return "/api/user/update/" + email
  }

  ngOnInit(){
    console.log("The code flow has entered ngOnInit() in user-profile.component.ts")

    let userTempDetails = JSON.parse(localStorage.getItem("userDetails") as string)

    let getUserApiPath = "/api/user/"+ userTempDetails.user.email

    this.$http.get( getUserApiPath )
                          .subscribe({
                            next : (data:any) => {
                              console.log("The data that we received from the database in user-profile.component.ts is " + data )
                              this.userDetails = data
                            },
                            error : (err:any) => {
                              console.log("The data that we received from the database in user-profile.component.ts is " + err)
                            }
                          })
  }

  public userProfileForm = this.$fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    passwordHash: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  });

  constructor(
    private readonly $fb : FormBuilder,
    private readonly $http: HttpClient,
    private readonly $router: Router
  ) {}

  onSubmit() {
    let user = this.userDetails
    console.log("The code flow has entered onSubmit() in user-profile.component.ts file ")
    console.log("The mail id of the user is "+ user.email)

    let updateApiPath = this.findUpdateUserApiPath(user.email)
    console.log("The update api path is " + updateApiPath)

    this.$http.patch(
      updateApiPath,
      this.userProfileForm.value
      )
      .subscribe({
        next: (data:any) => {
          console.log("The data updated in onSubmit() or the response received after update call in users.component.ts file is " + data)
          this.userDetails = data
        },
        error: (err:any) => {
          console.log("The error that we have received in onSubmit() in users.component.ts is " + err)
        }
      })
  }

  checkPasswordMatch( event: KeyboardEvent){
    const newPassword = this.userProfileForm.get("passwordHash")?.value
    const confirmPassword = this.userProfileForm.get("confirmpassword")?.value

    if( newPassword == confirmPassword ){
      console.log("The passwords match");
    } else {
      console.log("The passwords do not match");
    }
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
