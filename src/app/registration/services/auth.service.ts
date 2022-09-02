import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { MessageService } from 'src/app/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string = 'http://localhost:3000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private router: Router
  ) {}

  signup(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.URL}/signup`, JSON.stringify(user), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<User>('signed up')));
  }

  singin(user: User) {
    return this.http
      .post<User>(`${this.URL}/login`, user)
      .pipe(catchError(this.handleError('logged in')))
      .subscribe((res: any) => {
        if (res.token) {
          console.log(res);
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('userID', res._id);
          this.router.navigate(['/']);
        }
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null ? true : false;
  }

  logOut() {
    localStorage.removeItem('access_token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(text: string) {
    this.message.danger(text);
  }
}
