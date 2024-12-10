import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userLoginData = localStorage.getItem('loggedInUser');
    if (userLoginData) {
      const userData = JSON.parse(userLoginData);

      if (userData.token) {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${userData.token}`,
          },
        });

        return next.handle(clonedRequest);
      }
    }

    return next.handle(req);
  }
}
