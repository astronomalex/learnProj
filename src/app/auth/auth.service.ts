import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import { environment} from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {Store} from '@ngrx/store';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // this.user.next(user);
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(new AuthActions.AuthenticateSuccess({email, userId, token, expirationDate}));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'INVALID_EMAIL': {
        errorMessage = 'This email is invalid!';
        break;
      }
      case 'EMAIL_EXISTS': {
        errorMessage = 'The email address is already in use by another account.';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      }
    }
    return throwError(errorMessage);
  }
}
