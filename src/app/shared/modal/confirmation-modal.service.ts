import { Injectable, ViewContainerRef } from '@angular/core';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  private viewContainerRef!: ViewContainerRef;

  constructor() {}

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  confirm(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const componentRef =
        this.viewContainerRef.createComponent<ConfirmationComponent>(
          ConfirmationComponent
        );
      componentRef.instance.show(message);
      componentRef.instance.confirmed.subscribe((result: boolean) => {
        resolve(result);
        componentRef.destroy();
      });
    });
  }
}
