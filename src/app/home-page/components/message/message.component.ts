import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  public text!: string;
  public type!: string;

  private aSub!: Subscription;

  constructor(private message: MessageService) {}

  ngOnInit(): void {
    this.aSub = this.message.messages$.subscribe((message) => {
      this.text = message.text;
      this.type = message.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, 5000);
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
