import { Customer } from './../_models/customer';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  var userString = localStorage.getItem("user");

  console.log('authIntercepter...');
  if (!userString) return next(req);

  var user = JSON.parse(userString);
  var token = user.token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
