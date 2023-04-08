import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '../models/club';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  public clubs : Club[] = [
    {
      name: 'Rotary',
      link: 'https://www.rotary.org/en',
      hours: 2,
      type: "Social Service",
      city: "Miami",
      state: "Florida",
      zipcode: "33172",
      email: ""
    },
    {
      name: 'Peta',
      link: 'https://www.peta.org/',
      hours: 15,
      type: "Social Service",
      city: "Miami",
      state: "Florida",
      zipcode: "33375",
      email: ""
    },
    {
      name: 'ACM',
      link: 'https://www.acm.org/',
      hours: 5 ,
      type: "Social Service",
      city: "Miami",
      state: "Florida",
      zipcode: "33987",
      email: ""
    }
  ];

  constructor(
    private readonly $http: HttpClient,
    private readonly $router: Router
  ) {}
}
