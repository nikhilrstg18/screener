import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpRequest = req.clone({
      headers: req.headers
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT'),
    });

    return next.handle(httpRequest);
  }
}
