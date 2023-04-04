import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['../styles.scss']
})
export class UserProfilePageComponent {
  
  public userProfilePageForm = this.$fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    newpassword: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  });

  constructor(
    private readonly $fb : FormBuilder,
    private readonly $http: HttpClient,
    private readonly $router: Router
  ) {}

  onSubmit() {
    
  }

  checkPasswordMatch( event: KeyboardEvent){
    const newPassword = this.userProfilePageForm.get("newpassword")?.value
    const confirmPassword = this.userProfilePageForm.get("confirmpassword")?.value

    if( newPassword == confirmPassword ){
      console.log("The passwords match");
    } else {
      console.log("The passwords do not match");
    }
  }

  toggleMenu(){
    console.log("Hello from toggleMenu()");
    const x = document.getElementById("submenu");
    console.log(x);
    console.log(x?.style);
      console.log(x?.style.display);
      if( x?.style.display === "block" ){
        x.style.display = "";
      } else if( x?.style.display === "block" || x?.style.display === "" ) {
        x.style.display = "block";
      }
  }
}
