import {
  Component,
  PLATFORM_ID,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('errorLogin', { static: false }) private errorDiv!: ElementRef;
  @ViewChild('errorRegister', { static: false }) private errorDivReg!: ElementRef;

  public active = 'login';

  public loginForm = this.$fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  public registrationPageForm = this.$fb.group({
    email: [ '', Validators.required, Validators.email],
    phoneNumber: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    isClubRep: ['false', Validators.required]
  });

  constructor(
    @Inject(PLATFORM_ID) private readonly $platformId: any,
    private readonly $router: Router,
    private readonly $http: HttpClient,
    private readonly $fb: FormBuilder,
    private readonly $userService: UserService
  ) {}

  public toggle(tab: string) {
    this.active = tab;
  }

  public onSubmit() {
    let userDetail = {
      'firstName': 'Random',
      'lastName' : 'Guy',
      'id' : '12345678-1234-5678-1234-567812345678',
      'email': 'randomguy1@gmail.com',
      'userType': 'User', //role = [User -> User, ClubOwner -> ClubRep, Admin->Admin]
      'phoneNumber' : '98765'
    }

    console.log("The login call is initiated in login.component.ts ")
    localStorage.setItem('loginCredentials', JSON.stringify(this.loginForm.value))
    //localStorage.setItem('userDetails', JSON.stringify(userDetail))

    this.$http.post(
      '/api/auth/login',
      this.loginForm.value
    ).subscribe({
        next: ( responseData : any ) => {
          console.log("The response data is "+ responseData)
          console.log("The type of response data is "+ typeof responseData)
          console.log("The data of the response " + responseData.email)
          const userData = { user : responseData }
          console.log("The user details are updated")
          localStorage.setItem('userDetails', JSON.stringify(userData) )
          if( responseData.email !== undefined )
            this.$router.navigateByUrl('/welcome-page')
        },
        error: ( error : any ) => {
          console.log("This is the error message: "+ error)
          this.errorDiv.nativeElement.text = error;
        }
    });
    
    /*
    console.log("The login call is initiated in login.component.ts ")
    localStorage.setItem('loginCredentials', JSON.stringify(this.loginForm.value))
    localStorage.setItem('userDetails', JSON.stringify(userDetail))
    this.$http.post<{ accessToken: string}>(
      '/api/auth/login',
      this.loginForm.value
    )
      .subscribe({
        next: (data: { accessToken: string }) => {
          console.log("The login step 1 is completed and will initiate the user call in login.component.ts ")
          if (isPlatformBrowser(this.$platformId)) {
            window.localStorage.setItem('accessToken', data.accessToken);
          }
          this.$http.get<any>(
            '/api/user'
          )
            .subscribe({
              next: (data: any) => {
                console.log("The login step 2 is completed and in login.component.ts ")
                this.$userService.update(data);
                return this.$router.navigateByUrl('/welcome-page');
              },
              error: (error: Error) => {
                console.error(error)
              }
            })
        },
        error: (error: any) => {
          if (isPlatformBrowser(this.$platformId)) {
            console.log("This is the error message: "+ error)
            this.errorDiv.nativeElement.text = error;
          }
        }
      });
      */
  }

  public onRegister() {
    this.$http.post(
      '/api/auth/register',
      this.registrationPageForm.value
    ).subscribe({
      next : ( registeredUserData : any ) => {
        console.log("The registered user data is "+ registeredUserData)
        console.log("The type of registered user data is "+ typeof registeredUserData)
        let regUserDataJson = JSON.parse(registeredUserData)
      },
      error : ( err : any ) => {
        console.log("The error message is " + err)
        this.errorDivReg.nativeElement.text = err
      }
    });
    /*
    this.$http.post<{ accessToken: string}>(
      '/api/auth/register',
      this.registrationPageForm.value
    ).subscribe({
      next: (data: { accessToken: string }) => {
        if (isPlatformBrowser(this.$platformId)) {
          window.localStorage.setItem('accessToken', data.accessToken);
        }
      },
      error: (error: any) => {
        if (isPlatformBrowser(this.$platformId)) {
          this.errorDivReg.nativeElement.text = error;
        }
      }
    });
    */
  }
}
