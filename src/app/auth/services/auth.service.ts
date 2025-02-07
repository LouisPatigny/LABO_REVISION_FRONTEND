import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserTokenDTOModel } from '../models/user.token.dto.model';
import { LoginFormModel } from '../models/login.form.model';
import { RegisterFormModel } from '../models/register.form.model';
import { DecodedToken } from '../models/decoded.token.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser$: BehaviorSubject<UserTokenDTOModel | undefined>

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router,
  ) {
    let jsonUser = localStorage.getItem('currentUser');
    this._currentUser$ = new BehaviorSubject<UserTokenDTOModel | undefined>(
      jsonUser ? JSON.parse(jsonUser) : undefined
    )
  }

  register(form: RegisterFormModel): Observable<UserTokenDTOModel> {
    return this._http.post<UserTokenDTOModel>(`${environment.apiUrl}/User`, form).pipe(
      tap(_ => {
        this._currentUser$.next(_);
        localStorage.setItem('currentUser', JSON.stringify(_));
      })
    );
  }

  login(form: LoginFormModel): Observable<UserTokenDTOModel> {
    return this._http.post<UserTokenDTOModel>(`${environment.apiUrl}/User/login`, form).pipe(
      tap(_ => {
        this._currentUser$.next(_);
        localStorage.setItem('currentUser', JSON.stringify(_));
      })
    )
  }

  logout() {
    this._currentUser$.next(undefined);
    localStorage.removeItem('currentUser');
    this._router.navigate(['/auth/login']).then(r => {
    });
  }

  isLoggedIn(): boolean {
    return this.currentUser !== undefined;
  }

  get currentUser(): UserTokenDTOModel | undefined {
    return this._currentUser$.value;
  }

  get currentUser$(): Observable<UserTokenDTOModel | undefined> {
    return this._currentUser$.asObservable();
  }

  getCurrentUserId(): number | null {
    const userToken = this.currentUser;
    if (!userToken || !userToken.token) {
      return null;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(userToken.token);
      // 'sub' est un string dans le JWT — convert to number:
      return +decoded.sub;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  getCurrentUserEmail(): string | null {
    const userToken = this.currentUser;
    if (!userToken || !userToken.token) {
      return null;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(userToken.token);
      return decoded.email;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }
}
