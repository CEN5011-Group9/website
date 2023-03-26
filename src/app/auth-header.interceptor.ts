import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private readonly $platformId: any) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken;

    if (isPlatformBrowser(this.$platformId)) {
      accessToken = window.localStorage.getItem('accessToken') || null;
    }

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return next.handle(cloned);
  }
}
