import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClubDetailsComponent } from './club-details/club-details.component';
import { ManageClubComponent } from './manage-club/manage-club.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ClubContactsComponent } from './club-contacts/club-contacts.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UsersComponent } from './users/users.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'tracking-page',
    component: TrackingPageComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'users',
    component:UsersComponent
  },
  {
    path: 'search-results', component:SearchResultsComponent
  },
  {
    path: 'club-contacts',
    component: ClubContactsComponent
  },
  {
    path: 'manage-club',
    component:ManageClubComponent
  },
  {
    path: 'club-details',
    component: ClubDetailsComponent
  },
  {
    path: 'search-page',
    component: SearchPageComponent
  },
  {
    path: '**',
    component:WelcomePageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        initialNavigation: 'enabledBlocking'
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
