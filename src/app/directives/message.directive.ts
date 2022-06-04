import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[msg]',
})
export class MessageDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
