import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';

export interface Account {
  isNew: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  account!: Account;
  credentials: { username: string; password: string } = {
    username: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.account = <Account>this.location.getState();
  }

  onFocus() {
    this.account.isNew = false;
    this.error = false;
  }

  onSubmit() {
    this.loginService.authenticate(this.credentials).subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate(['issues']);
        } else {
          this.error = true;
        }
      },
      error: () => {
        this.error = true;
      },
    });
    return false;
  }

  onRegister() {
    this.router.navigate(['register']);
  }
}
