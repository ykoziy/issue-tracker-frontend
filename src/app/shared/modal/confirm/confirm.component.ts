import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass'],
})
export class ConfirmComponent {
  @Input() message: string = 'null';
  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }

  onOk(): void {
    this.ok.emit();
  }
}
