import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: any;

  constructor() {}

  ngOnInit(): void {}

  setBannedStyle(): string {
    if (!this.user.enabled) {
      return 'bg-danger';
    }
    return '';
  }

  getLockedStatus(): string {
    return this.user.locked ? 'Locked' : 'Unlocked';
  }
}
