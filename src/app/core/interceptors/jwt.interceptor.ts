import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserTokenDTOModel } from '../../auth/models/user.token.dto.model';
import { AuthService } from '../../auth/services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService)
  let userToken: UserTokenDTOModel | undefined = authService.currentUser
  if (userToken) {
    let token = userToken.token

    if (token && token !== '') {
      let requestClone = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + token)
      })
      return next(requestClone).pipe(catchError(err => {
        if (err.status === 401) {
          authService.logout()
        }
        return throwError(err)
      }))
    }
  }
  return next(req)
}
