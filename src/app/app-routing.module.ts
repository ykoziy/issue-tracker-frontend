import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { IssueDetailComponent } from './issues/issue-detail/issue-detail.component';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'issue', component: IssueDetailComponent, canActivate: [AuthGuard] },
  { path: 'issues', component: IssueListComponent, canActivate: [AuthGuard] },
  { path: 'newIssue', component: NewIssueComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
