import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

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

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  login() {
    this.loginService.authenticate(this.credentials, () => {
      console.log('aaaaa I got in');
      console.log(this.loginService.authenticated);
    });
    return false;
  }
}
