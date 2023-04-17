import { Component } from '@angular/core';
import { Club } from '../models/club';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club-contacts',
  templateUrl: './club-contacts.component.html',
  styleUrls: ['./club-contacts.component.scss']
})
export class ClubContactsComponent {
  
  clubDetails : any

  addressDetails : any

  constructor( private router : ActivatedRoute ){ }

  ngOnInit(){
    this.router.params.subscribe( params=> {
      console.log("The club details parameter is " + params)
      console.log("The club details parameter in String format is " + JSON.stringify(params))

      this.clubDetails = params
      /*
      this.clubDetails = JSON.parse(params['clubDetails'])
      this.addressDetails = JSON.parse(params['addressDetails'])
      */
    })
  }

  

}
