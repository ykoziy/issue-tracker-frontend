import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['issues']);
  }

  isLoggedIn(): boolean {
    return this.loginService.getToken() !== '';
  }
}
