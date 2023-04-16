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
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ClubContactsComponent } from './club-contacts/club-contacts.component';
import { ManageClubComponent } from './manage-club/manage-club.component';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { SearchComponent } from './search/search.component';
import { UserService } from './user.service';
import { ViewClubsComponent } from './view-clubs/view-clubs.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackingPageComponent,
    UserProfileComponent,
    UsersComponent,
    WelcomePageComponent,
    ClubContactsComponent,
    ManageClubComponent,
    ClubDetailsComponent,
    SearchComponent,
    ViewClubsComponent,
    UpdateUserComponent
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
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
