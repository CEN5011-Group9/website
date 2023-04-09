import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClubDetailsComponent } from './club-details/club-details.component';
import { ManageClubComponent } from './manage-club/manage-club.component';
import { SearchComponent } from './search/search.component';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ClubContactsComponent } from './club-contacts/club-contacts.component';
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
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'welcome-page',
    component: WelcomePageComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'welcome-page',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        initialNavigation: 'enabledBlocking',
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
