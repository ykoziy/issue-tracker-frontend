import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { User } from '../interfaces/user';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.profileService.getUsers().subscribe((userData) => {
      this.users = userData;
    });
  }

  onBan(user: User) {
    this.profileService.banUser(user).subscribe({
      next: () => {
        console.log('banning');
      },
    });
  }

  setBannedStyle(user: User) {
    if (user.locked) {
      return 'list-group-item-danger';
    }
    return '';
  }

  // show list of users with date of registration
  // have button to deactivate account
  // have button to activate account
  // change password
}
