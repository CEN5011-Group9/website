import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '../club';

@Component({
  selector: 'app-view-search-results-page',
  templateUrl: './view-search-results-page.component.html',
  styleUrls: ['./view-search-results-page.component.scss']
})
export class ViewSearchResultsPageComponent {

  clubs : Club[] = [
    { name: 'Rotary', link: 'https://www.rotary.org/en', hours: 2, type: "Social Service", city: "Miami", state: "Florida", zipcode: "33172"},
    { name: 'Peta', link: 'https://www.peta.org/', hours: 15, type: "Social Service", city: "Miami", state: "Florida", zipcode: "33375"},
    { name: 'ACM', link: 'https://www.acm.org/', hours: 5 , type: "Social Service", city: "Miami", state: "Florida", zipcode: "33987"}
  ];

  public constructor(
    private readonly $http: HttpClient,
    private readonly $router: Router
  ){}
}
