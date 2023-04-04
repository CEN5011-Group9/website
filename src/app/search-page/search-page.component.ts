import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['../styles.scss']
})
export class SearchPageComponent {

  searchPageForm = this.$fb.group({
    clubname : [''],
    clubtype : [''],
    city : [''],
    state : [''],
    zipcode : ['']
  });

  constructor(
    private readonly $fb : FormBuilder,
    private readonly $http : HttpClient,
    private readonly $router : Router
  ){ }

  search(){

  }

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
