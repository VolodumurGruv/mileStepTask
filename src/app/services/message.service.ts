import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages = new Subject<Alert>();

  messages$ = this.messages.asObservable();

  success(text: string) {
    this.messages.next({type: 'success', text});
  }

  warrnign(text: string) {
    this.messages.next({type: 'warning', text})
  }

  danger(text: string) {
    this.messages.next({type: 'danger', text})
  }
}
