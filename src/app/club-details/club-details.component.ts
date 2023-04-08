import { Component } from '@angular/core';
import { Club } from '../models/club';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss']
})
export class ClubDetailsComponent {

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

  public join(){
    // let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
    // let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
    // if( leaveElement !== null )
    //   leaveElement.style.display = "block";
    // if( joinElement !== null )
    //   joinElement.style.display = "none";
  }

  public leave(){
    // let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
    // let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
    // if( leaveElement !== null )
    //   leaveElement.style.display = "none";
    // if( joinElement !== null )
    //   joinElement.style.display = "block";
  }
}
