import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ViewUsersPageComponent } from './view-users-page/view-users-page.component';
import { LoginModule } from './login/login.module';
import { ViewSearchResultsPageComponent } from './view-search-results-page/view-search-results-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ViewClubContactsPageComponent } from './view-club-contacts-page/view-club-contacts-page.component';
import { ManageClubPageComponent } from './manage-club-page/manage-club-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackingPageComponent,
    UserProfilePageComponent,
    ViewUsersPageComponent,
    ViewSearchResultsPageComponent,
    WelcomePageComponent,
    ViewClubContactsPageComponent,
    ManageClubPageComponent
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
