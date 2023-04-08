import { Component } from '@angular/core';
import { Club } from '../models/club';

@Component({
  selector: 'app-club-contacts',
  templateUrl: './club-contacts.component.html',
  styleUrls: ['./club-contacts.component.scss']
})
export class ClubContactsComponent {
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
}
