import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/interfaces/newuser';
import { RegistrationService } from 'src/app/auth/registration.service';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm = {} as FormGroup;
  nameMaxLength = 30;
  minLength = 2;
  isRegisterError = false;
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.isRegisterError = false;
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.maxLength(this.nameMaxLength),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.maxLength(this.nameMaxLength),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConf: [''],
    });
    this.registerForm.setValidators(this.passwordMatchValidator);
  }

  passwordMatchValidator(g: AbstractControl) {
    return g.get('password')?.value === g.get('passwordConf')?.value
      ? null
      : { mismatch: true };
  }

  registerUser(): void {
    const newUser: NewUser = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      username: this.registerForm.value.userName,
    };
    this.registrationService.registerUser(newUser).subscribe({
      next: () => this.router.navigate(['/login'], { state: { isNew: true } }),
      error: (error) => {
        if (error.status === 409) {
          this.isRegisterError = true;
        }
      },
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const message = 'Are you sure you want to register?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.registerUser();
      }
    }
  }

  onFocus(): void {
    this.isRegisterError = false;
  }

  fm(name: string): AbstractControl<any, any> {
    return this.registerForm.controls[name];
  }
}
