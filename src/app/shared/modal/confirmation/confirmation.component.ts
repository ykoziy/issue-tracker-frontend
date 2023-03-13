import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass'],
})
export class ConfirmationComponent {
  visible = false;
  message: string | undefined;
  @Output() confirmed = new EventEmitter<boolean>();

  show(message: string): void {
    this.visible = true;
    this.message = message;
  }

  hide(): void {
    this.visible = false;
  }

  confirm(): void {
    this.confirmed.emit(true);
    this.hide();
  }

  cancel(): void {
    this.confirmed.emit(false);
    this.hide();
  }
}
