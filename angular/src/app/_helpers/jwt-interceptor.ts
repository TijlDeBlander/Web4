import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}
