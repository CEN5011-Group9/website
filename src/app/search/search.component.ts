import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '@prisma/client';
import { Observable } from 'rxjs';

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
}
