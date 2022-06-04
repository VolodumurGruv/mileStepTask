import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {
  constructor(private message: MessageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap((b) => {
        if (b instanceof HttpResponse) {
          // if saved successfully
          if (b.body.message) {
            this.message.success(b.body.message);
          } else if (b.body.error) {
            this.message.danger(b.body.error);
          }
        }
      })
    );
  }
}
