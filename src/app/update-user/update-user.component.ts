import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private readonly $router : ActivatedRoute
  ){}

  public updateClubApiForm = this.$fb.group({
    email: [""],
    role: [""],
    firstName: [""],
    lastName: [""],
    phoneNumber: [""]
  })

  findUpdateUserApiPath( email : string ){
    return "http://localhost:4200/api/user/update/" + email
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
}
