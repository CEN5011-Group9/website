import { Component } from '@angular/core';
import { Club } from '../club';

@Component({
  selector: 'app-club-details-page',
  templateUrl: './club-details-page.component.html',
  styleUrls: ['./club-details-page.component.scss']
})
export class ClubDetailsPageComponent {
  
  club : Club = { name: 'Rotary', link: 'https://www.rotary.org/en', hours: 2, type: "Social Service", city: "Miami", state: "Florida", zipcode: "33172"};
  
  join(){
    let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
    let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
    if( leaveElement !== null )
      leaveElement.style.display = "block";
    if( joinElement !== null )
      joinElement.style.display = "none";
  }

  leave(){
    let leaveElement = document != null ? document.getElementById("leavebutton") != null ? document.getElementById("leavebutton") : null : null;
    let joinElement = document != null ? document.getElementById("joinbutton") != null ? document.getElementById("joinbutton") : null : null;
    if( leaveElement !== null )
      leaveElement.style.display = "none";
    if( joinElement !== null )
      joinElement.style.display = "block";    
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
