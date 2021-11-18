import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _userservice: UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this._userservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
  
  // let tokenizedReq = req.clone({
  //   setHeader: {
  //     Autherization: 'Bearer  xx.yy.zz'
  //   }
  // })
  // return next.handle(tokenizedReq)
}
