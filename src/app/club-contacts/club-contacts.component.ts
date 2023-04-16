import { Component } from '@angular/core';
import { Club } from '../models/club';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club-contacts',
  templateUrl: './club-contacts.component.html',
  styleUrls: ['./club-contacts.component.scss']
})
export class ClubContactsComponent {
  public club : Club = {
    name: 'ShoppersStop',
    link: 'https://www.rotary.org/en',
    hours: 2,
    type: "Social Service",
    city: "Tampa",
    state: "New York",
    zipcode: "56789",
    email: "",
    addressId: ""
  };

  clubFromClubDetails: any;

  constructor( private router : ActivatedRoute ){ }

  ngOnInit(){
    this.router.queryParams.subscribe( params=> {
      this.clubFromClubDetails = JSON.parse(params['club']);
    })
  }

  public stringify(){
    return JSON.stringify(this.club);
  }

}
