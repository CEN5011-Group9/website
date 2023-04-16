import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from '../models/club';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss']
})
export class ClubDetailsComponent {

  constructor( private readonly router : ActivatedRoute ) { }

  clubDetails : any

  ngOnInit(){
    console.log("The log is "+ this.router.queryParams)
    if( this.router.queryParams !== undefined )  //Doubt #1 - How to handle this
      this.router.queryParams.subscribe( params=> {
        this.clubDetails = JSON.parse(params['club']);
      })
  }

  public club : Club = {
    name: 'Rotary',
    link: 'https://www.rotary.org/en',
    hours: 2,
    type: "Social Service",
    city: "Miami",
    state: "Florida",
    zipcode: "33172",
    email: "",
    addressId: ""
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

  public stringify(){
    return JSON.stringify(this.club);
  }
}
