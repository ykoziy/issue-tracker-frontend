import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { User } from 'src/app/interfaces/user';
import { ProfileService } from 'src/app/service/profile.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  profileForm = {} as FormGroup;
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  nameMaxLength = 30;
  minLength = 2;

  userProfile: User = <User>{};
  userId: number = 0;

  // show error if cant pull up user
  // show confirmation on good user update
  // confirm data is valid
  userFound: boolean = false;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private loginService: LoginService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId();
    this.createProfileForm();
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
    if (this.userId > 0) {
      this.profileService
        .getProfile(this.userId)
        .subscribe((userProfileData) => {
          this.userProfile = userProfileData;
          this.profileForm.patchValue({
            firstName: this.userProfile.firstName,
            lastName: this.userProfile.lastName,
            userName: this.userProfile.username,
            email: this.userProfile.email,
          });
        });
      this.userFound = true;
    }
  }

  private toggleIsEditing(): void {
    this.isEditing = !this.isEditing;
  }

  onEdit(): void {
    this.toggleIsEditing();
    this.enableInputs(this.profileForm, true);
  }

  private createProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.maxLength(this.nameMaxLength),
        ],
      ],
      lastName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.maxLength(this.nameMaxLength),
        ],
      ],
      userName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
    });
  }

  enableInputs(group: FormGroup, enabled: boolean): void {
    for (const i in group.controls) {
      if (enabled) {
        group.controls[i].enable();
      } else {
        group.controls[i].disable();
      }
    }
  }

  fm(name: string): AbstractControl<any, any> {
    return this.profileForm.controls[name];
  }

  async onSave(): Promise<void> {
    if (this.profileForm.valid) {
      const message = 'This will update the profile. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.saveProfile();
      }
    }
  }

  saveProfile(): void {
    const updatedUser: User = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      username: this.profileForm.value.userName,
      userRole: this.userProfile.userRole,
      locked: this.userProfile.locked,
      enabled: this.userProfile.enabled,
    };
    this.profileService.updateProfile(updatedUser, this.userId).subscribe({
      next: () => {
        this.toggleIsEditing();
        this.enableInputs(this.profileForm, false);
        if (updatedUser.username !== this.userProfile.username) {
          this.loginService.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
    });
  }
}
