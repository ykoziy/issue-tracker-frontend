import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  credentials: { username: string; password: string } = {
    username: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.loginService.authenticate(this.credentials, () => {
      console.log('aaaaa I got in');
      console.log(this.loginService.getToken());
      this.router.navigate(['issues']);
    });
    return false;
  }
}
