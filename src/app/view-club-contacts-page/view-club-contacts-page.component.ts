import { Component } from '@angular/core';
import { Club } from '../club';

@Component({
  selector: 'app-view-club-contacts-page',
  templateUrl: './view-club-contacts-page.component.html',
  styleUrls: ['../styles.scss']
})
export class ViewClubContactsPageComponent {
    club : Club = { name: 'Rotary', link: 'https://www.rotary.org/en', hours: 2, type: "Social Service", city: "Miami", state: "Florida", zipcode: "33172"};

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
