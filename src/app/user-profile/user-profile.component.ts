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

  public userProfileForm = this.$fb.group({
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
    const newPassword = this.userProfileForm.get("newpassword")?.value
    const confirmPassword = this.userProfileForm.get("confirmpassword")?.value

    if( newPassword == confirmPassword ){
      console.log("The passwords match");
    } else {
      console.log("The passwords do not match");
    }
  }
}
