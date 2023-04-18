import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss']
})
export class CreateClubComponent {

  constructor(
    private readonly $http : HttpClient,
    private readonly $router : ActivatedRoute,
    private readonly $fb : FormBuilder
  ) { }

  createClubForm = this.$fb.group({
    name : [""],
    type: [""],
    description: [""],
    phone: [""],
    email: [""],
    street : [''],
    city : [""],
    state : [""],
    zipcode: [""],
    addressId: [""],
    link: [""]
  })

  ngOnInit(){
    console.log("We have entered ngOnInit() in CreateClubComponent")
  }

  create(){
    console.log("The create() is called from the create-club.component.ts")

    let createClubApiPath = "http://localhost:4200/api/club/create"

    console.log("The createClubForm value is " + JSON.stringify(this.createClubForm.value))

    this.$http.post(
      createClubApiPath,
      this.createClubForm.value
    ).subscribe({
      next : (data: any) => {
        console.log("We have entered the create() method in create-club.component.ts ")
        console.log("The details of the created club is "+ JSON.stringify(data))
      },
      error : (err : any ) => {
        console.log( "The error received in create() create-club.component.ts " + err )
      }
    })    
  }



}
