import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAnchor]',
})
export class AnchorDirective {
  // define an anchor point to tell Angular where to insert components
  constructor(public viewContainerRef: ViewContainerRef) {}
}
