import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Newuser } from 'src/app/interfaces/newuser';
import { RegistrationService } from 'src/app/auth/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm = {} as FormGroup;
  nameMaxLength = 30;
  minLength = 2;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
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

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: Newuser = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        userName: this.registerForm.value.userName,
      };
      this.registrationService.registerUser(newUser).subscribe({
        next: () => this.router.navigate(['/login']),
      });
    }
  }

  fm(name: string): AbstractControl<any, any> {
    return this.registerForm.controls[name] as AbstractControl<any, any>;
  }
}
