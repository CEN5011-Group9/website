import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms'
import { User } from './user';

@Component({
  selector: 'app-view-users-page',
  templateUrl: './view-users-page.component.html',
  styleUrls: ['./view-users-page.component.scss']
})
export class ViewUsersPageComponent {
    
  public viewUsersPageForm = this.$fb.group({});

  public users : User[] = [
    { name: 'Jenny', phone: '98765', userType: 'Student', email: 'jenny1224@gmail.com'},
    { name: 'Snow' , phone: '12345' , userType: 'Student', email: 'snow1234@gmail.com'},
    { name: 'Dany' , phone: '12345' , userType: 'Student', email: 'dany1234@gmail.com'},
  ];

    constructor( 
      private readonly $fb : FormBuilder,
      private readonly $http: HttpClient,
      private readonly $router: Router
    ) {}

    viewTracking(){

    }

    update(){

    }

    delete(){
      
    }
}
