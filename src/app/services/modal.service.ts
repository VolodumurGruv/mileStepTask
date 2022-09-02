import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private URL: string = 'http://localhost:3000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private message: MessageService) {}

  getTasks(id: string): Observable<Task[]> {
    const options = { params: new HttpParams().set('userID', id) };
    return this.http
      .get<Task[]>(this.URL, options)
      .pipe(catchError(this.handleError<Task[]>('Got task')));
  }

  addTask(task: Task, id: string): Observable<Task> {
    return this.http
      .post<Task>(`${this.URL}/add`, JSON.stringify(task), {
        headers: this.headers,
        params: new HttpParams().set('userID', id),
      })
      .pipe(catchError(this.handleError<Task>('Added task')));
  }

  editTask(id: string, task: Task): Observable<Task> {
    return this.http
      .post<Task>(`${this.URL}/edit`, JSON.stringify({ id, ...task }), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<Task>('Edited task')));
  }

  deleteTask(id: string): Observable<string> {
    return this.http
      .post<string>(`${this.URL}/delete`, JSON.stringify({ id }), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<any>('deleted task')));
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
