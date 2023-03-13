import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';
import { UserData } from '../model/userdata';
import { ProfileService } from '../service/profile.service';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';
import { AnchorDirective } from '../shared/modal/anchor.directive';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  userData = <UserData>{};
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  constructor(
    private profileService: ProfileService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.initUsers();
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
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

  async onBan(user: User): Promise<void> {
    const message = 'Are you sure you want to ban the user?';
    const result = await this.confirmationModalService.confirm(message);
    if (result) {
      this.banUser(user);
    }
  }

  banUser(user: User): void {
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
