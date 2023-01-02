import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.loginService.logout();
  }
}
