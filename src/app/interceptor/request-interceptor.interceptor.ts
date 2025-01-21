import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const requestInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const serviceToken = inject(TokenService)
  const myToken = serviceToken.getItem()
  if (myToken) {
    console.log("in interceptor")
    const cloneRequest= req.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`,
      },
  })
  console.log(cloneRequest)
  return next(cloneRequest);

  }



//console.log(myToken)
console.log(req)
  return next(req);
};
