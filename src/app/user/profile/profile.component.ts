import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { User } from 'src/app/interfaces/user';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  userProfile: User = <User>{};
  // show error if cant pull up user
  // show confirmation on good user update
  // confirm data is valid
  userFound: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userId = this.loginService.getUserId();
    if (userId > 0) {
      this.profileService.getProfile(userId).subscribe((userProfileData) => {
        this.userProfile = userProfileData;
        console.log(this.userProfile);
      });
      this.userFound = true;
    }
  }

  private switchIsUpdating(): void {
    this.isUpdating = !this.isUpdating;
  }

  onEdit(): void {
    this.switchIsUpdating();
  }

  onSave(): void {
    this.switchIsUpdating();
  }
}
