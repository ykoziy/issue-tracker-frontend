import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserData } from '../model/userdata';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  userData = <UserData>{};

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.initUsers();
  }

  handlePageChange(page: number) {
    this.profileService.getUsers(page - 1).subscribe((response: UserData) => {
      this.userData = response;
    });
  }

  initUsers(): void {
    this.profileService.getUsers().subscribe((response: UserData) => {
      this.userData = response;
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
