import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UpdateTaskService {
  private updateTask = new Subject<string>();

  updateTask$ = this.updateTask.asObservable();

  updatedTask(id: string) {
    this.updateTask.next(id);
  }
}
