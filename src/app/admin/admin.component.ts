import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initUsers();
  }

  initUsers(): void {
    this.profileService.getUsers().subscribe((userData) => {
      this.users = userData;
    });
  }

  onBan(user: User) {
    this.profileService.banUser(user).subscribe({
      next: () => {
        this.initUsers();
      },
    });
  }

  setBannedStyle(user: User) {
    if (!user.enabled) {
      return 'list-group-item-danger';
    }
    return '';
  }

  // show list of users with date of registration
  // have button to activate account
  // change password
}
