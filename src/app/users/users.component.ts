import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { style } from '@angular/animations';

@Component({
  selector: 'app-view-users-page',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public users : User[] = [
    { name: 'Jenny', phone: '98765', userType: 'Student', email: 'jenny1224@gmail.com'},
    { name: 'Snow' , phone: '12345' , userType: 'Student', email: 'snow1234@gmail.com'},
    { name: 'Dany' , phone: '12345' , userType: 'Student', email: 'dany1234@gmail.com'},
  ];

    constructor(
      private readonly $http: HttpClient,
      private readonly $router: Router
    ) {}

  public viewTracking(){

  }

  public update(){

  }

  public delete(){

  }
}
