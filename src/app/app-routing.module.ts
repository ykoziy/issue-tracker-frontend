import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { IssueDetailComponent } from './issues/issue-detail/issue-detail.component';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { IssuesResolver } from './issues/issues-resolver.service';
import { IssueResolver } from './issues/issue-resolver.service';
import { EditCommentComponent } from './comments/edit-comment/edit-comment.component';
import { CloseIssueComponent } from './issues/close-issue/close-issue.component';
import { AdminComponent } from './admin/admin.component';
import { EditIssueComponent } from './issues/edit-issue/edit-issue.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'issue/:id',
    component: IssueDetailComponent,
    canActivate: [AuthGuard],
    resolve: { issue: IssueResolver },
    children: [],
  },
  {
    path: 'issue/:id/edit',
    component: EditIssueComponent,
    canActivate: [AuthGuard],
    resolve: { issue: IssueResolver },
    children: [],
  },
  {
    path: 'issue/:id/close',
    component: CloseIssueComponent,
    canActivate: [AuthGuard],
    children: [],
  },
  {
    path: 'issues',
    component: IssueListComponent,
    canActivate: [AuthGuard],
    resolve: { issues: IssuesResolver },
  },
  { path: 'newIssue', component: NewIssueComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'newComment',
    component: NewCommentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editComment',
    component: EditCommentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
