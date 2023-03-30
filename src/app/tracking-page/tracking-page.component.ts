import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from './club';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.scss']
})
export class TrackingPageComponent implements OnInit{

  public trackingPageForm = this.$fb.group({});

  clubs : Club[] = [
    { name: 'Rotary', link: 'https://www.rotary.org/en', hours: 2},
    { name: 'Peta', link: 'https://www.peta.org/', hours: 15},
    { name: 'ACM', link: 'https://www.acm.org/', hours: 5 }
  ];

  totalHours: number = 0;

  ngOnInit(): void{
    this.totalHours = this.clubs.reduce((acc, club) => acc + club.hours, 0)
  }
  

  constructor( 
    private readonly $fb : FormBuilder, 
    private readonly $http : HttpClient,
    private readonly $router : Router
    ) {}

  onSubmit(){
    this.$http.post<{ accessToken: String }>(
      'api/user/update',
      this.trackingPageForm.value
    )
  }

  
}
