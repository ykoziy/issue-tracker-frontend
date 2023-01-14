import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { IssueDetailComponent } from './issues/issue-detail/issue-detail.component';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { CommentComponent } from './comments/comment/comment.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'issue', component: IssueDetailComponent, canActivate: [AuthGuard] },
  { path: 'issues', component: IssueListComponent, canActivate: [AuthGuard] },
  { path: 'newIssue', component: NewIssueComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'newComment',
    component: NewCommentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
