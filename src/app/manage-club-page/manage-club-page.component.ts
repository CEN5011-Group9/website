import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '../club';

@Component({
  selector: 'app-manage-club-page',
  templateUrl: './manage-club-page.component.html',
  styleUrls: ['../styles.scss']
})
export class ManageClubPageComponent {
  club : Club = { name: 'Rotary', link: 'https://www.rotary.org/en', hours: 2, type: "Social Service", city: "Miami", state: "Florida", zipcode: "33172"};

  manageClubForm = this.$fb.group({
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
