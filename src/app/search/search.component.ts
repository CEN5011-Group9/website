import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '@prisma/client';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public searchForm = this.$fb.group({
    name : [''],
  });

  public searchSubscription: Observable<any[]> | null = null;

  constructor(
    private readonly $fb : FormBuilder,
    private readonly $http : HttpClient,
    private readonly $router : Router
  ){ }

  public search() {
    this.searchSubscription = this.$http.get<any>('/api/search/clubs', {
      params: {
        name: this.searchForm.get('name')?.value as string
      }
    });
  }

  navigateToUserProfile(){
    console.log("The code flow enters navigateToUserProfile() method in app.component.ts ")
    this.$router.navigate(['/user-profile'])
  }

  logoutAndNavigateToLoginScreen(){
    console.log("The code flow enters logoutAndNavigateToLoginScreen() method in app.component.ts ")
    localStorage.removeItem('userDetails')
    localStorage.removeItem('loginCredentials')
    this.$router.navigate(['/login'])
  }

  isAdminOrClubRep() : boolean {
    let user = JSON.parse(localStorage.getItem("userDetails") as string).user
    return user.role === "Admin" || user.role === "ClubOwner"
  }

  isAdminOrStudent() : boolean {
    let user = JSON.parse(localStorage.getItem("userDetails") as string).user
    return user.role === "Admin" || user.role === "User"
  }

  isStudent() : boolean {
    let user = JSON.parse(localStorage.getItem("userDetails") as string).user
    return user.role === "User"
  }

  navigateToWelcomePage(){
    console.log("The code flow enters navigateToWelcomePage() method in app.component.ts ")
    this.$router.navigate(['/welcome-page'])
  }
}
