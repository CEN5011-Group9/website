import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';

const routes: Routes = [{
  path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
},
{
  path: 'tracking-page', component: TrackingPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
