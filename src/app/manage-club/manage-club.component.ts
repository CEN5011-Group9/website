import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '../models/club';

@Component({
  selector: 'app-manage-club',
  templateUrl: './manage-club.component.html',
  styleUrls: ['./manage-club.component.scss']
})
export class ManageClubComponent {
  public club : Club = {
    name: 'Rotary',
    link: 'https://www.rotary.org/en',
    hours: 2,
    type: "Social Service",
    city: "Miami",
    state: "Florida",
    zipcode: "33172",
    email: ""
  };

  public manageClubForm = this.$fb.group({
    clubname : [this.club.name],
    clubtype: [this.club.type],
    addressLine1 : [''],
    city : [this.club.city],
    state : [this.club.state]
  });

  constructor(
    private readonly $router: Router,
    private readonly $http: HttpClient,
    private readonly $fb: FormBuilder
  ) {}

  onSubmit(){

  }
}
