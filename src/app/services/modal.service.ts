import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private URL: string = 'http://localhost:3000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.URL, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods':
            'GET, PATCH, PUT, POST, DELETE, OPTIONS',
        },
      })
      .pipe(
        // map((data: any) => {
        //   return data;
        // }),
        catchError(this.handleError)
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(`${this.URL}/add`, JSON.stringify(task), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  editTask(id: string, task: Task): Observable<Task> {
    return this.http
      .post<Task>(`${this.URL}/edit`, JSON.stringify({ id, ...task }), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: string): Observable<string> {
    return this.http
      .post<string>(`${this.URL}/delete`, JSON.stringify({ id }), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`Client side error: ${error.error}`);
    } else {
      console.error(
        `Backend error STATUS: ${error.status} error: ${error.error}`
      );
    }

    return throwError(() => new Error('Try later'));
  }
}
