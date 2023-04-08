import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '../models/club';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.scss']
})
export class TrackingPageComponent implements OnInit {

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
      hours: 5,
      type: "Social Service",
      city: "Miami",
      state: "Florida",
      zipcode: "33987",
      email: ""
    }
  ];

  totalHours: number = 0;

  constructor(
    private readonly $fb : FormBuilder,
    private readonly $http : HttpClient,
    private readonly $router : Router
    ) {}


  public ngOnInit(): void{
    this.totalHours = this.clubs.reduce((acc, club) => acc + club.hours, 0)
  }
}
