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
    password: ['', Validators.required]
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
    this.$http.post<{ accessToken: string}>(
      '/api/auth/login',
      this.loginForm.value
    )
      .subscribe({
        next: (data: { accessToken: string }) => {
          if (isPlatformBrowser(this.$platformId)) {
            window.localStorage.setItem('accessToken', data.accessToken);
          }
          this.$http.get<any>(
            '/api/user'
          )
            .subscribe({
              next: (data: any) => {
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
            this.errorDiv.nativeElement.text = error;
          }
        }
      });
  }

  public onRegister() {
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
  }
}
