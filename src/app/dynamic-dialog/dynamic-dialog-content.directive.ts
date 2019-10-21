import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicDialogContent]'
})
export class DynamicDialogContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
