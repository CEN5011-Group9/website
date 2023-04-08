import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { LoginModule } from './login/login.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ClubContactsComponent } from './club-contacts/club-contacts.component';
import { ManageClubComponent } from './manage-club/manage-club.component';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackingPageComponent,
    UserProfileComponent,
    UsersComponent,
    SearchResultsComponent,
    WelcomePageComponent,
    ClubContactsComponent,
    ManageClubComponent,
    ClubDetailsComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
