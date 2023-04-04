import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['../styles.scss']
})
export class WelcomePageComponent {
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
