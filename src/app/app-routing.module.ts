import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailsPageComponent } from './club-details-page/club-details-page.component';
import { ManageClubPageComponent } from './manage-club-page/manage-club-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ViewClubContactsPageComponent } from './view-club-contacts-page/view-club-contacts-page.component';
import { ViewSearchResultsPageComponent } from './view-search-results-page/view-search-results-page.component';
import { ViewUsersPageComponent } from './view-users-page/view-users-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [{
  path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
},
{
  path: 'tracking-page', component: TrackingPageComponent
},
{
  path: 'user-profile-page', component: UserProfilePageComponent
},
{
  path: 'view-users-page', component:ViewUsersPageComponent
},
{
  path: 'view-search-results-page', component:ViewSearchResultsPageComponent
},
{
  path: 'welcome-page', component:WelcomePageComponent
},
{
  path: 'view-club-contacts-page', component:ViewClubContactsPageComponent
},
{
  path: 'manage-club-page', component:ManageClubPageComponent
},
{
  path: 'club-details-page', component: ClubDetailsPageComponent
},
{
  path: 'search-page', component: SearchPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
