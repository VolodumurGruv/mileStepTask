import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string = 'http://localhost:3000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private currentUser = {};

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.URL}/signup`, user)
      .pipe(catchError(this.handleError));
  }

  singin(user: User) {
    return this.http
      .post<any>(`${this.URL}/signup`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
      });
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
