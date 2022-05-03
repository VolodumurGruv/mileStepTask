import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Task} from 'src/app/interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  addTask(task: Task[]): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.URL}/add`, task);
  }
}
