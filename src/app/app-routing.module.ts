import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ViewUsersPageComponent } from './view-users-page/view-users-page.component';

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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
