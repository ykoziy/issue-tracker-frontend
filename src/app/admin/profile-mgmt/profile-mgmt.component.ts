import { Location } from '@angular/common';
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
  selector: 'app-profile-mgmt',
  templateUrl: './profile-mgmt.component.html',
  styleUrls: ['./profile-mgmt.component.sass'],
})
export class ProfileMgmtComponent implements OnInit {
  profileForm: FormGroup;
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  nameMaxLength = 30;
  minLength = 2;

  user!: User;

  userId: number = 0;

  isEditing: boolean = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private loginService: LoginService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {
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
      userRole: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.user = <User>this.location.getState();
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );

    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      userName: this.user.username,
      email: this.user.email,
      userRole: this.user.userRole,
    });
  }

  onEdit(): void {
    this.toggleIsEditing();
    this.enableInputs(this.profileForm, true);
  }

  private toggleIsEditing(): void {
    this.isEditing = !this.isEditing;
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

  getFormControl(name: string): AbstractControl<any, any> {
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
      userRole: this.profileForm.value.userRole,
      locked: this.user.locked,
      enabled: this.user.enabled,
      createdOn: this.user.createdOn,
      lockedOn: this.user.lockedOn,
      updatedOn: this.user.updatedOn,
      disabledOn: this.user.disabledOn,
      id: this.user.id,
    };
    this.profileService.updateProfile(updatedUser, this.user.id!).subscribe({
      next: () => {
        this.toggleIsEditing();
        this.enableInputs(this.profileForm, false);
        if (updatedUser.username !== this.user.username) {
          this.loginService.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
    });
  }
}
