import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private taskId = new Subject<any>();

  taskId$ = this.taskId.asObservable();

  setTaskId(id: number) {
    this.taskId.next(id);
    console.log(id);
  }
}
