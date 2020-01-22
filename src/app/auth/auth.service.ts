import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthResponseData {
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
  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBprZR6I5avmnwsse8co1obFemrVJfaCWU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error ocured!';
        if (!error.error || !error.error.error) {
          return throwError(errorMessage);
        }
        switch (error.error.error.message) {
          case 'INVALID_EMAIL': {
            errorMessage = 'This email is invalid!';
            break;
          }
          case 'EMAIL_EXISTS': {
            errorMessage = 'The email address is already in use by another account.';
            break;
          }
        }
        return throwError(errorMessage);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBprZR6I5avmnwsse8co1obFemrVJfaCWU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
}
